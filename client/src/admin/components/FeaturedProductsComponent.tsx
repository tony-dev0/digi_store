import toast from "react-hot-toast";

export const FeaturedProductsComponent: React.FC<ProductsProps> = ({
  index,
  product,
}) => {
  const Popup = () => {
    toast("no actions for now");
  };
  return (
    <div className="wrap" key={index}>
      <div className="f_item text-center">
        <img src={product?.photos[0]} />
        <h6>{product?.name}</h6>
        <hr style={{ margin: 0 }} />
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="px-4 py-1 my-2 btn rounded-3 btn-sm btn-customx"
            onClick={Popup}
          >
            {" "}
            View Item
          </button>
        </div>
      </div>
    </div>
  );
};
