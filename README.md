# Shopify App

This is the official Scircula Shopify Application. 

## Getting Started

### First time setup

#### Shopify App creation
Before starting working on this project you have to create a Shopify partner account and a Shopify Application.

The official Shopify tutorial can be found here: [Shopify App Creation](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#get-a-shopify-api-key)

#### Required environment variables
Then you can populate the env file. To do so you can copy the .env.example file to .env and modify the values.

```env
// .env
NEXT_PUBLIC_SHOPIFY_API_KEY='YOUR API KEY FROM SHOPIFY PARTNERS DASHBOARD'
SHOPIFY_API_SECRET='YOUR API SECRET KEY FROM SHOPIFY PARTNERS DASHBOARD'
SHOPIFY_API_SCOPES=read_products
SHOPIFY_APP_URL='YOUR LOCALTUNNEL HTTPS ADDRESS'
NEXT_PUBLIC_API_URL=
AUTHENTIFICATION_SERVER_URL=...
AUTHENTIFICATION_CLIENT_ID=...
AUTHENTIFICATION_CLIENT_SECRET=...
AUTHENTIFICATION_SCOPE=...
```

#### Exposing dev environment
To make the application work inside a Shopify shop, you'll have to expose your local environment to the world. To do so you can install [localtunnel](https://github.com/localtunnel/localtunnel):

```sh
npm install -g localtunnel
```

Then you can follow the general instructions below.

### Installation

#### Install the dependencies

```sh
npm install
```

#### Run the NextJS app
First you need a local Redis server running:

```sh
docker run -p 6379:6379 -d redis
```
And then you can run the app
```sh
npm run dev
```

#### Expose the app
```sh
npx localtunnel --port 3000 --subdomain scircula-shopify  --local-host localhost
```

## Common errors

To fix the error below when installing the dependencies
```sh
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! Found: react@17.0.2
npm ERR! node_modules/react
npm ERR!   react@"^17.0.2" from the root project
```
Use this command
```
npm install --legacy-peer-deps
```
[Source](https://blog.npmjs.org/post/626173315965468672/npm-v7-series-beta-release-and-semver-major)

## Resources
[Implementaion Details](https://docs.google.com/document/d/1bYTnTKhPdBa1MDEdgcqp8jHoB0_pvQbHnq2_M7-p2jE/edit?usp=sharing)
