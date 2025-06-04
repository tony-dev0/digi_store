import { toast } from "react-hot-toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/cart/cartSlice";
import { _Navbar } from "../components/Nav";
import Pagination from "../components/Pagination";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { Link } from "react-router-dom";
import { MainProductsComponent } from "../components/MainProductsComponent";

export default function AllProducts() {
  const dispatch = useDispatch();
  const { loader, products } = useSelector((state: any) => state.product);
  const realProducts = products.filter((product: any) => {
    return product.category !== "featured";
  });
  const featuredProduct = products.filter((product: any) => {
    return product.category == "featured";
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [productsPerPage, setproductsPerPage] = useState<number>(8);
  const productsPerPage = 8; // You can adjust this value as needed
  const indexofLastProduct = currentPage * productsPerPage;
  const indexofFirstProduct = indexofLastProduct - productsPerPage;
  const totalProducts = realProducts.length;
  const currentProducts = realProducts.slice(
    indexofFirstProduct,
    indexofLastProduct
  );
  const addItem = (item: Itemtype) => {
    dispatch(addItemToCart({ ...item, quantity: 1 }));
    toast.success("item added to cart");
  };
  const nextPage = (page: number) => {
    if (currentPage < page) {
      setCurrentPage((val) => val + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((val) => val - 1);
    }
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  console.log(realProducts);
  return (
    <>
      <Header />
      <div className="categories-wrapper">
        <div className="categories">
          <ul className="categories-list">
            <li className="list">
              <b>All Categories&nbsp; | </b>
            </li>
            {featuredProduct &&
              featuredProduct.map((fp: { name: string }, i: number) => {
                let ref = "/products/category/" + fp.name.toLowerCase();
                return (
                  <li className="list" key={i}>
                    <Link to={ref}>{fp.name}</Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      {totalProducts > 1 && (
        <section className="top_items py-4" style={{ backgroundColor: "#fff" }}>
          <nav className="breadcrumb-divider mt-5" aria-label="breadcrumb">
            <ol className="breadcrumb ms-2">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a>All product</a>
              </li>
            </ol>
          </nav>
          <div className="mt-4 mb-3 ms-2">
            <h5 className="text-muted">
              Showing {indexofFirstProduct + 1}-
              {indexofLastProduct > totalProducts
                ? totalProducts
                : indexofLastProduct}{" "}
              products from {totalProducts} products
            </h5>
          </div>

          <div className="wrapper-container mb-4">
            {loader
              ? "loading..."
              : currentProducts.map((product: Itemtype, i: any) => {
                  return (
                    <MainProductsComponent
                      index={i}
                      product={product}
                      addItem={() => addItem(product)}
                    />
                  );
                })}
          </div>

          {realProducts.length > productsPerPage && (
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={totalProducts}
              currentPage={currentPage}
              paginate={paginate}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          )}
        </section>
      )}
      <Footer />
    </>
  );
}
