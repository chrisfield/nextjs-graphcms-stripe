import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
});

type Prices = Price[];

type Price = {
  unit_amount: number
};

export default async (products): Promise<Prices> => {

  const priceRequests = products.map(product => (stripe.prices.retrieve(product.stripePriceId)));

  return await Promise.all(priceRequests);  
}