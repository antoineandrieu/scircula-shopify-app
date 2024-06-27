import { Shopify } from "@shopify/shopify-api";

export const loadScriptTag = async (accessToken, shop, input) => {
  const query = `
    mutation {
      scriptTagCreate(
        input: 
          {  src: "${input.src}",
             displayScope: ${input.displayScope}
          }
        )
        {
          scriptTag {
            id
            src
          }
          userErrors {
            message
            field
          }
        }
    }`;
  const client = new Shopify.Clients.Graphql(shop, accessToken);
  const response = await client.query({
    data: query,
  });
  const { data, errors } = response.body;
  let scriptTagId = null;
  if (errors) {
    console.error(errors);
  } else {
    scriptTagId = data.scriptTagCreate.scriptTag.id;
    console.log(`Successfully loaded scriptTag with id ${scriptTagId}`);
  }

  return scriptTagId;
};

export const unloadScriptTag = async (accessToken, shop, input) => {
  const query = `
    mutation {
      scriptTagDelete(id: "${input.id}")
        {
          deletedScriptTagId
          userErrors {
            message
            field
          }
        }
    }`;
  const client = new Shopify.Clients.Graphql(shop, accessToken);
  const response = await client.query({
    data: query,
  });
  const { data, errors } = response.body;
  let scriptTagId = null;
  if (errors) {
    console.error(errors);
  } else {
    scriptTagId = data.scriptTagDelete.deletedScriptTagId;
    console.log(`Successfully removed scriptTag with id ${scriptTagId}`);
  }

  return scriptTagId;
};
