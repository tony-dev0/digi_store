import { cur } from "../currency.js";
export const TopProductsComponent: React.FC<ProductsProps> = ({
  index,
  product,
}) => {
  return (
    <div className="item" key={index}>
      <a href={`/desc/${product._id}`}>
        <img src={product.photos[0]} />
        <div className="b_text">
          <h5>{cur.format(product.price)}</h5>
          <del>
            <h6 className="text-muted">{cur.format(product.prevprice)}</h6>
          </del>
        </div>
      </a>
    </div>
  );
};
