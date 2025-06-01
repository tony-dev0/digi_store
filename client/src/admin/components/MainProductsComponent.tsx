import { Link } from 'react-router-dom'
import { cur } from '../../currency.js'

export const MainProductsComponent: React.FC<ProductsProps> = ({
  product,
  index,
}) => {
  return (
    <div className="item mtl" key={index}>
      <Link to={`/admin/products/desc/${product?._id}`}>
        <div className="img-wrapper">
          <img src={require('../../assets/' + product?.photos[0])} alt="" />
        </div>
        <div className="b_text px-3">
          <div className="productTitle">
            <h6 className="mt-3">
              {product?.name.length >= 40
                ? product?.name.slice(0, 35) + '...'
                : product?.name}
            </h6>
          </div>
          <div className="priceSection mb-2">
            <h5 className="text-muted p-0 mb-1">
              {cur.format(product?.price)}
            </h5>
            <del>
              <h6 className="text-muted p-0">
                {product?.prevprice ? (
                  cur.format(product?.prevprice)
                ) : (
                  <span>&nbsp;</span>
                )}
              </h6>
            </del>
          </div>
        </div>
      </Link>
      <div className="d-flex align-items-center mb-2 justify-content-center">
        <Link to={`/admin/products/desc/${product?._id}`}>
          <button className="px-x py-2 mb-2 btn rounded-3 btn-sm btn-customx">
            {' '}
            View Item
          </button>
        </Link>
      </div>
    </div>
  )
}
