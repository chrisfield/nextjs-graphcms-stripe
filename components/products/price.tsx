export type Props = {
  price: number
};

export default ({ price }: Props) => (
  <span className="price">
    £{price/100}
    <style jsx>{`
      .price {
        font-size: 2em;
      }
    `}
    </style>
  </span>
);
