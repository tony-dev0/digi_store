import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/cart/cartSlice";
import { _Navbar } from "../components/Nav";
import img from "../assets/icons/img.svg";
import Pagination from "../components/Pagination";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { MainProductsComponent } from "../components/MainProductsComponent";

export default function Category() {
  const dispatch = useDispatch();
  const { loader, products } = useSelector((state: any) => state.product);
  const realProducts = products.filter((product: any) => {
    return product.category !== "featured";
  });
  const featuredProduct = products.filter((product: any) => {
    return product.category == "featured";
  });
  const params = useParams();
  const category = params.q;
  const categoryResult: any[] = [];

  realProducts.map((p: any) => {
    if (p.type.toLowerCase().includes(category!.toLowerCase())) {
      categoryResult.push(p);
    }
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [productsPerPage, setproductsPerPage] = useState<number>(8);
  const productsPerPage = 8; // You can adjust this value as needed
  const indexofLastProduct = currentPage * productsPerPage;
  const indexofFirstProduct = indexofLastProduct - productsPerPage;
  const currentProducts = categoryResult.slice(
    indexofFirstProduct,
    indexofLastProduct
  );
  const totalProducts = categoryResult.length;

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

  return (
    <>
      <Header />
      <div className="categories-wrapper">
        <section>
          <div className="categories">
            <ul className="categories-list">
              <li className="list">
                <b>All Categories&nbsp; | </b>
              </li>
              {featuredProduct &&
                featuredProduct.map((fp: { name: string }, i: any) => {
                  let ref = "/products/category/" + fp.name.toLowerCase();
                  return (
                    <li className="list" key={i}>
                      <Link to={ref}>{fp.name}</Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </section>
      </div>
      {categoryResult.length < 1 ? (
        <section className="py-5 search_result d-flex justify-content-center align-items-center bg-white">
          <div className="container text-center my-5">
            <img src={img} alt="" />
            <h3 className="mb-2">There is no item found in "{category}"</h3>
            <p>- The products could be out of stock</p>
            <p>- there might be no added item yet </p>
            <p>- Try other categories or search for a specific item</p>
            <a href="/products">
              <button className="mt-3 btn btn-success rounded-3">
                View Products
              </button>
            </a>
          </div>
        </section>
      ) : (
        <section className="top_items py-4" style={{ backgroundColor: "#fff" }}>
          <nav className="breadcrumb-divider mt-5" aria-label="breadcrumb">
            <ol className="breadcrumb ms-2">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/products">All product</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {category}
              </li>
              <li className="d-none breadcrumb-item active" aria-current="page">
                Category results for {category}
              </li>
            </ol>
          </nav>
          <div className="mt-4 mb-3 ms-2">
            <h2>Showing items in "{category}"</h2>
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
              ? "loading"
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

          {categoryResult.length > productsPerPage && (
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
