# Ecommerce example using Nextjs GraphCms and Stripe

## Getting Started

Obviously clone the repo and yarn install (or npm if you prefer).

Create a Stripe account and define some products with prices - notice the 'API ID' stored against each product price. 

Create a graphCms account. Define products in the schema to match the query in `services/graphcms/get-all-products.ts`. Create the same products you added to Stripe setting the stripePriceId to the product/price-api-id copied from stripe eg "price_1H5UA8Gr1aMYF0A8n2xKu8wW".

Copy `.env-example` to `.env.local` and set the values for Stripe and GraphCms

`npm run dev`

## Useful links
[GraphQL + Next.js](https://dev.to/graphcms/graphql-next-js-working-with-getstaticprops-getstaticpaths-and-graphql-2kfe)

[Type-safe Payments with Next.js, TypeScript, and Stripe](https://dev.to/thorwebdev/type-safe-payments-with-next-js-typescript-and-stripe-4jo7)