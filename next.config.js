module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config

    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

    // Important: return the modified config
    return config;
  },
  env: {
    NEXT_PUBLIC_SHOPIFY_API_KEY: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY,
    SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
    SHOPIFY_API_SCOPES: process.env.SHOPIFY_API_SCOPES,
    SHOPIFY_APP_URL: process.env.SHOPIFY_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    AUTHENTICATION_SERVER_URL: process.env.AUTHENTICATION_SERVER_URL,
    AUTHENTICATION_SCOPE: process.env.AUTHENTICATION_SCOPE,
    AUTHENTICATION_CLIENT_ID: process.env.AUTHENTICATION_CLIENT_ID,
    AUTHENTICATION_CLIENT_SECRET: process.env.AUTHENTICATION_CLIENT_SECRET,
  },
};
