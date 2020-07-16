import { GraphQLClient } from 'graphql-request';

export default async () => {
  const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const { products } = await graphcms.request(`
    query{
      products {
        sku
        stripePriceId
        quantityInStock
        description
        images {
          fileName
          url
        }
      }
    }
  `);

  return products;
}