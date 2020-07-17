import { GraphQLClient } from 'graphql-request';

export default async (checkoutLineItems: any[]) => {
  const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const productUpdateRequests = checkoutLineItems.map(product => (
    graphcms.request(`
      mutation {
        updateProduct(
          where: {stripeProductId: "${product.price.product}"}
          data: {quantityInStock: 0}
        ){
          id
        }
      }
    `)
  ));

  const updatedProducts = await Promise.all(productUpdateRequests);
  const publishRequests = updatedProducts.map(({updateProduct: {id}}) => (
    graphcms.request(`
      mutation {
        publishProduct(where: {id: "${id}"})
        {
          id
        }
      }
    `)    
  ));
  await Promise.all(publishRequests);
}