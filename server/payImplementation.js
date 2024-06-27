import { default as Shopify } from "@shopify/shopify-api";

const payImplementation = async (accessToken, shop, input) => {
  // TODO: Remove test true
  const query = `
      mutation {
        appPurchaseOneTimeCreate(name: "${input.name}",
          test: true,
          price: { amount: ${input.amount}, currencyCode: USD },
          returnUrl: "${input.returnUrl}") {
            userErrors {
              field
              message
            }
            confirmationUrl
        }
      }
  `;
  const client = new Shopify.Clients.Graphql(shop, accessToken);
  const response = await client.query({
    data: query,
  });

  if (response.body.errors) {
    console.error(response.body.errors);
    return null;
  }
  const appPurchaseData = response.body.data.appPurchaseOneTimeCreate;

  return {
    confirmationUrl: appPurchaseData.confirmationUrl,
  };
};

export default payImplementation;
