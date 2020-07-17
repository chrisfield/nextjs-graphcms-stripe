import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
});

type Data = {
  session: Stripe.Checkout.Session,
  lineItems: any,
  products: Stripe.ApiList<Stripe.Product>
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {sessionId} = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId as string);
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId as string);
  const products = await stripe.products.list();
  
  res.status(200).json({ session, lineItems, products })
}