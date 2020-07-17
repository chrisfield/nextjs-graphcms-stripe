import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
});

type Data = {
  session: Stripe.Checkout.Session,
  lineItems: any,
  customer: Stripe.Customer
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {sessionId} = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId as string);
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId as string);
  const customer = (await stripe.customers.retrieve(session.customer as string) as Stripe.Customer);
  
  res.status(200).json({ session, lineItems, customer })
}