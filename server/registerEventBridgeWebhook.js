import { Shopify } from "@shopify/shopify-api";

const registerEventBridgeWebhook = async (accessToken, shop, arn, topic) => {
  const query = `
    mutation {
  eventBridgeWebhookSubscriptionCreate(topic: ${topic}, webhookSubscription: {arn: "${arn}", format: JSON}) {
    webhookSubscription {
      id
      endpoint
      topic
    }
    userErrors {
      message
    }
  }
}

    `;
  const client = new Shopify.Clients.Graphql(shop, accessToken);
  const response = await client.query({
    data: query,
  });

  const { errors } = response.body;
  if (errors) {
    console.error(errors);
  } else {
    console.log(`Successfully registered ${topic} webhook`);
  }

  return !errors;
};

export default registerEventBridgeWebhook;
