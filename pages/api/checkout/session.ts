import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
});

type Data = {
  sessionId: string
}



export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {quantity, priceId} = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['GB'],
    },
    line_items: [{
      price: priceId,
      quantity,
    }],
    mode: 'payment',
    success_url: `${req.headers.origin}/result?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/`,
  })
  res.status(200).json({ sessionId: session.id })
}