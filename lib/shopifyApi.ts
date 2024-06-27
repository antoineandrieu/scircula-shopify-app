import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let apolloClient;

const createApolloClient = (shop, accessToken) => {
  const authLink = setContext((_, {}) => {
    // Return the headers to the context so httpLink can read them
    return {
      headers: {
        "X-Shopify-Access-Token": accessToken,
      },
    };
  });

  const httpLink = new HttpLink({
    // uri: `/graphql`,
    uri: `https://${shop}/admin/api/2021-07/graphql.json`,
    credentials: "include",
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export function getApolloClient(shop, accessToken, initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient(shop, accessToken);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}
