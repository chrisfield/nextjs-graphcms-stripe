import Products from '../components/products';
import getAllProducts from '../services/graphcms/get-all-products';
import getPrices from '../services/stripe/get-prices';

export default ({ products })=> {
  return (
    <div>
      <h1>Angela Sidwell - Artist</h1>
      <Products products={products}/>
      <style jsx>{`
        h1 {
          margin: 2em 0 1em;
          text-align: center;
          font-size: 3em;
        }
      `}
      </style>
    </div>
  );
};

export async function getServerSideProps() {

  const products = await getAllProducts();
  const prices = await getPrices(products);
  const productsWithPrices = products.map((product, index) => ({
    ...product,
    price: prices[index].unit_amount
  }));

  return {
    props: {
      products: productsWithPrices
    }
  };
}