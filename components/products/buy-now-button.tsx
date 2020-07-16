import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default ({stripePriceId}) => {
  const handleClick = async (event) => {
    // Call your backend to create the Checkout Session—see previous step
    const { sessionId } = await fetch('/api/checkout/session', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({'quantity': 1, priceId: stripePriceId })
    }).then(res => res.json())
    // Redirect to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  return (
    <button role="link" onClick={handleClick}>
      Buy now
    </button>
  );
};
