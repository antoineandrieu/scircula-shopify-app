import createShopifyAuth from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import dotenv from "dotenv";
import "isomorphic-fetch";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import next from "next";

import { getAuthenticationAccessToken } from "../lib/backendMethods";
import RedisStore from "../lib/redisStore";
import createSubscription from "./createSubscription";
import payImplementation from "./payImplementation";
import registerEventBridgeWebhook from "./registerEventBridgeWebhook";
import registerWebhook from "./registerWebhook";
import { loadScriptTag, unloadScriptTag } from "./scriptTag";
import { updateVendor } from "../lib/backendMethods";

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

let sessionStorage = null;
let redisStore = null;
if (process.env.REDIS_STORE) {
  redisStore = new RedisStore(process.env.REDIS_URL);
  sessionStorage = new Shopify.Session.CustomSessionStorage(
    redisStore.storeCallback,
    redisStore.loadCallback,
    redisStore.deleteCallback,
  );
} else {
  sessionStorage = new Shopify.Session.MemorySessionStorage();
}

Shopify.Context.initialize({
  API_KEY: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SHOPIFY_APP_SCOPES.split(","),
  HOST_NAME: process.env.SHOPIFY_APP_URL.replace(/^https:\/\//, ""),
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: true,
  SESSION_STORAGE: sessionStorage,
});

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      accessMode: "offline",
      async afterAuth(ctx) {
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;

        console.log("After Auth", shop, accessToken);

        try {
          await registerEventBridgeWebhook(
            accessToken,
            shop,
            process.env.WEBHOOKS_ARN,
            "ORDERS_CREATE",
          );
          await registerEventBridgeWebhook(
            accessToken,
            shop,
            process.env.WEBHOOKS_ARN,
            "REFUNDS_CREATE",
          );
          await registerEventBridgeWebhook(
            accessToken,
            shop,
            process.env.WEBHOOKS_ARN,
            "CARTS_CREATE",
          );
          await registerEventBridgeWebhook(
            accessToken,
            shop,
            process.env.WEBHOOKS_ARN,
            "CARTS_UPDATE",
          );
          await registerWebhook(
            accessToken,
            shop,
            `${process.env.SHOPIFY_APP_URL}/webhooks/app/uninstalled`,
            "APP_UNINSTALLED",
          );
        } catch (error) {
          console.error("webhooks error", error);
        }

        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    }),
  );

  const handleRequest = async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.res.statusCode = 200;
  };

  router.post("/webhooks/app/uninstalled", async context => {
    const shop = context.request.header["x-shopify-shop-domain"];
    await redisStore.deleteCallback(`offline_${shop}`);
    const scirculaAccessToken = await getAuthenticationAccessToken();
    const now = new Date();
    const uninstalledAt = now.toISOString();
    await updateVendor(scirculaAccessToken, shop, {
      uninstalledAt,
      shopifySubscriptionId: null,
    });
  });

  router.post("/webhooks", async ctx => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post("/scripttag", async (context, next) => {
    const shop = context.request.body.shop;
    const session = await redisStore.loadCallback(`offline_${shop}`);
    const scriptTagId = await loadScriptTag(
      session.accessToken,
      shop,
      context.request.body.input,
    );
    const now = new Date();
    const fmfLoadedAt = now.toISOString();
    const scirculaAccessToken = await getAuthenticationAccessToken();
    await updateVendor(scirculaAccessToken, shop, {
      fmfLoadedAt,
    });
    context.body = scriptTagId;
    context.res.statusCode = 200;
  });

  router.post("/plan", async (context, next) => {
    const host = context.request.body.host;
    const shop = context.request.body.shop;
    const input = context.request.body.input;
    const session = await redisStore.loadCallback(`offline_${shop}`);
    const returnUrl = `${process.env.SHOPIFY_APP_URL}/charge/?shop=${shop}&host=${host}&plan=${input.name}`;
    input.returnUrl = returnUrl;
    const subscriptionData = await createSubscription(
      session.accessToken,
      shop,
      input,
    );
    context.body = subscriptionData.confirmationUrl;
    context.res.statusCode = 200;
  });

  router.post("/integration", async (context, next) => {
    const host = context.request.body.host;
    const shop = context.request.body.shop;
    const input = context.request.body.input;
    const session = await redisStore.loadCallback(`offline_${shop}`);
    const returnUrl = `${process.env.SHOPIFY_APP_URL}/purchase/?shop=${shop}&host=${host}`;
    input.returnUrl = returnUrl;

    const implementationPayData = await payImplementation(
      session.accessToken,
      shop,
      input,
    );
    context.body = implementationPayData.confirmationUrl;
    context.res.statusCode = 200;
  });

  router.delete("/scripttag", async (context, next) => {
    const shop = context.request.body.shop;
    const session = await redisStore.loadCallback(`offline_${shop}`);
    const scriptTagId = await unloadScriptTag(
      session.accessToken,
      shop,
      context.request.body.input,
    );
    const scirculaAccessToken = await getAuthenticationAccessToken();
    const now = new Date();
    const fmfUnloadedAt = now.toISOString();
    await updateVendor(scirculaAccessToken, shop, {
      fmfUnloadedAt,
    });
    context.body = scriptTagId;
    context.res.statusCode = 200;
  });

  router.get("/healthcheck", async context => {
    context.res.statusCode = 200;
  });

  router.get("(/_next/static/.*)", handleRequest);
  router.get("/_next/webpack-hmr", handleRequest);

  router.get("/charge/:charge_id*", async context => {
    const plan = context.query.plan;
    const scirculaAccessToken = await getAuthenticationAccessToken();
    await updateVendor(scirculaAccessToken, context.query.shop, {
      shopifySubscriptionId: `gid://shopify/AppSubscription/${context.query.charge_id}`,
      scirculaPlan: plan,
    });
    context.redirect(`/?shop=${context.query.shop}&host=${context.query.host}`);
  });

  router.get("/purchase/:charge_id*", async context => {
    const scirculaAccessToken = await getAuthenticationAccessToken();
    const now = new Date();
    const integrationPaidAt = now.toISOString();
    await updateVendor(scirculaAccessToken, context.query.shop, {
      shopifySubscriptionId: `gid://shopify/AppSubscription/${context.query.charge_id}`,
      integrationPaidAt,
      integrationToBePaid: false,
    });
    context.redirect(`/?shop=${context.query.shop}&host=${context.query.host}`);
  });

  router.get("(.*)", async context => {
    const host = context.query.host;
    const shop = context.query.shop;
    const session = await redisStore.loadCallback(`offline_${shop}`);
    const scirculaAccessToken = await getAuthenticationAccessToken();
    // @ts-ignore
    context.req.host = host;
    // @ts-ignore
    context.req.shop = shop;
    // @ts-ignore
    context.req.accessToken = session?.accessToken;
    // @ts-ignore
    context.req.scirculaAccessToken = scirculaAccessToken;

    if (session === undefined) {
      context.redirect(`/auth?shop=${shop}`);
    } else {
      await handleRequest(context);
    }
  });

  server.use(bodyParser());
  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
