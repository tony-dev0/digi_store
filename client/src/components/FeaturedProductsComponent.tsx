export const FeaturedProductsComponent: React.FC<ProductsProps> = ({
  index,
  product,
}) => {
  return (
    <div className="wrap" key={index}>
      <div className="f_item text-center">
        <a href={'/products/category/' + product.name.toLowerCase()}>
          <img src={require('../assets/' + product.photos[0])} />
          <h6>{product.name}</h6>
        </a>
      </div>
    </div>
  )
}
