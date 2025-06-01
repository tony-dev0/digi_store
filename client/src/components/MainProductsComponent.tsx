import { cur } from '../currency.js'

export const MainProductsComponent: React.FC<ProductsProps> = ({
  product,
  index,
  addItem,
}) => {
  return (
    <div className="item mtl mtl_box" key={index}>
      <a href={`/desc/${product._id}`}>
        <div className="img-wrapper">
          <img src={require('../assets/' + product.photos[0])} alt="" />
        </div>
        <div className="b_text px-3">
          <div className="productTitle">
            <h6>
              {product.name.length > 40
                ? product.name.slice(0, 40) + '...'
                : product.name}
            </h6>
          </div>
          <h5 className="text-muted">{cur.format(product.price)}</h5>
          <del>
            <h6 className="text-muted mb-3">
              {product.prevprice ? (
                cur.format(product.prevprice)
              ) : (
                <span>&nbsp;</span>
              )}
            </h6>
          </del>
        </div>
      </a>
      <div className="pb-3 px-3">
        <button className="btn btn-primary w-100" onClick={addItem}>
          ADD TO CART
        </button>
      </div>
    </div>
  )
}
