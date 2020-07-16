import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
import Products from '../components/products';
import getAllProducts from '../services/graphcms/get-all-products';
import getPrices from '../services/stripe/get-prices';


export default ({ products })=> {
  const handleClick = async (event) => {
    // Call your backend to create the Checkout Session—see previous step
    const { sessionId } = await fetch('/api/checkout/session', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({'quantity': 1})
    }).then(res => res.json())
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  return (
    <div>
      <h1>Checkout</h1>
      <button role="link" onClick={handleClick}>
        Checkout
      </button>
      <Products products={products}/>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
};

export async function getServerSideProps() {

  const products = await getAllProducts();
  const prices = await getPrices(products);
  const productsWithPrices = products.map((product, index) => ({
    ...product,
    price: prices[index].unit_amount
  }))
  console.log('prices', prices)

  return {
    props: {
      products: productsWithPrices
    }
  };
}