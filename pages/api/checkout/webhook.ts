import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';
import setProductQuantity from '../../../services/graphcms/set-product-quantity';

type Data = {};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
});

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.body.type === 'checkout.session.completed') {
    const sessionId = req.body.data.object.id;
    const { data } = await stripe.checkout.sessions.listLineItems(sessionId as string);
    await setProductQuantity(data);
  }
  res.status(200).json({});
}