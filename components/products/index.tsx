import Price from './price';
import BuyNowButton from './buy-now-button';

export type ProductProps = {
  products: Product[]
};

type Product = {
  sku: string
  images: any,
  quantityInStock: number,
  description: string,
  price: number,
  stripePriceId: string
};

export default function ({ products }: ProductProps) {
  return (
    <ul>
      {products.map(product => (
        <li className="product" key={product.sku}>
          <div className="images">
            {product.images.map(image => (
              <img key={image.url} src={image.url} alt={image.fileName}/>
            ))}
          </div>
          <div className="description-panel">
            <div className="description">
              {product.description}
            </div>
          </div>
          <div className="buy-panel">
            <div className="buy-panel-content">
              <Price price={product.price}/>
              <BuyNowButton stripePriceId={product.stripePriceId} soldOut={product.quantityInStock <= 0}/>
            </div>
          </div>
        </li>
      ))}
      <style jsx>{`
          .product {
            margin: 2em 0;
          }
          .product::after {
            content: "";
            display: block;
            max-width: 350px;
            width: 100%;
            border-bottom: 5px dashed #cfcfcf;
            margin: 4em auto;
          }
          .images {;
            display: flex;
            justify-content: center;
          }
          img {
            max-width: 400px;
          }
          .description-panel {
            display:flex;
            justify-content: center;
          }
          .description {
            font-size: 1.2em;
            padding: 1em;
            max-width: 400px;
          }
          .buy-panel {
            display:flex;
            justify-content: center;
          }
          .buy-panel-content {
            min-width: 300px;
            display:flex;
            justify-content: space-around;
          }          
        `}
      </style>
    </ul>
  )
};