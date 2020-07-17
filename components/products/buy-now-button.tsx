import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default ({stripePriceId, soldOut}) => {
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
    <span className="container">
      {soldOut ? 'Sold' :
        <button role="link" onClick={handleClick} disabled={soldOut}>
          Buy now
        </button>
      }
      <style jsx>{`
        .container {
          font-size: 2em;
        }
        button {
          padding: 5px;
          font-size: .7em;
        }
      `}
      </style>
    </span>
  );
};
