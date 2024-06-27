import { default as Shopify } from "@shopify/shopify-api";

const createSubscription = async (accessToken, shop, input) => {
  // TODO: Remove test true
  const query = `
    mutation {
      appSubscriptionCreate(name: "${input.name}",
        trialDays: 30,
        lineItems: [{
          plan: {
            appRecurringPricingDetails: {
              price: { amount: ${input.amount}, currencyCode: USD },
              interval: ${input.interval},
            },
          },
        }],
        test: true,
        returnUrl: "${input.returnUrl}") {
          appSubscription {
            id
          }
          confirmationUrl
          userErrors {
            field
            message
          }
      }
    }
  `;
  const client = new Shopify.Clients.Graphql(shop, accessToken);
  const response = await client.query({
    data: query,
  });
  const subscriptionData = response.body.data.appSubscriptionCreate;

  return {
    confirmationUrl: subscriptionData.confirmationUrl,
    subscriptionId: subscriptionData.appSubscription.id,
  };
};

export default createSubscription;
