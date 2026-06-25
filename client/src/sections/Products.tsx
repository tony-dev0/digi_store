import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/cart/cartSlice";
import { FeaturedProductsComponent } from "../components/FeaturedProductsComponent";
import { LimitedProductsComponent } from "../components/LimitedProductsComponent";
import { TopProductsComponent } from "../components/TopProductsComponent";
import { MainProductsComponent } from "../components/MainProductsComponent";

export const Featured = () => {
  const { loader, products } = useSelector((state: any) => state.product);
  const safeProducts = Array.isArray(products) ? products : [];
  return (
    <>
      <section className="featured py-5" id="featured">
        <h2 className="mb-3 ms-2">Featured Category</h2>
        <div id="main_row">
          {loader
            ? "loading..."
            : safeProducts.map((product: Itemtype, i: any) => {
                if (product.category == "featured") {
                  return (
                    <div className="wrap" key={i}>
                      <FeaturedProductsComponent product={product} />
                    </div>
                  );
                }
              })}
        </div>
      </section>
    </>
  );
};
export const Topitems = () => {
  const { loader, products } = useSelector((state: any) => state.product);
  const safeProducts = Array.isArray(products) ? products : [];
  let limit = 0;
  return (
    <>
      <section className="top_items">
        <h2 className="mb-3">Top Selling items</h2>
        <div className="list_top_items">
          {loader
            ? "loading..."
            : safeProducts.map((product: Itemtype, i: any) => {
                if (product.category == "top" && limit < 6) {
                  limit++;

                  return (
                    <div className="item" key={i}>
                      <TopProductsComponent product={product} />
                    </div>
                  );
                }
              })}
        </div>
      </section>
    </>
  );
};
export const Limitedstocks = () => {
  const { loader, products } = useSelector((state: any) => state.product);
  const safeProducts = Array.isArray(products) ? products : [];
  let limit = 0;
  return (
    <>
      <section className="top_items py-5">
        <h2 className="mb-3">Limited Stock Deals</h2>
        <div className="list_top_items">
          {loader
            ? "loading..."
            : safeProducts.map((product: Itemtype, i: any) => {
                if (product.category == "limited" && limit < 6) {
                  limit++;
                  return (
                    <div className="item" key={i}>
                      <LimitedProductsComponent product={product} />
                    </div>
                  );
                }
              })}
        </div>
      </section>
    </>
  );
};
export const Maingadget = () => {
  const { loader, products } = useSelector((state: any) => state.product);
  const safeProducts = Array.isArray(products) ? products : [];
  const dispatch = useDispatch();
  const addItem = (item: Itemtype) => {
    dispatch(addItemToCart({ ...item, quantity: 1 }));
    toast.success("item added to cart");
  };
  return (
    <>
      <section className="top_items py-5" id="product">
        <h2 className="mb-3 ms-2">Mobile/tablet and Laptop</h2>
        <div className="wrapper-container">
          {loader
            ? "loading..."
            : safeProducts.map((product: Itemtype, i: any) => {
                if (product.category == "com") {
                  return (
                    <div className="item mtl mtl_box" key={i}>
                      <MainProductsComponent
                        product={product}
                        addItem={() => addItem(product)}
                      />
                    </div>
                  );
                }
              })}
        </div>
      </section>
    </>
  );
};
