import { toast } from 'react-hot-toast';
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from "../redux/cart/cartSlice";
import { Topitems } from "../sections/Products";
import { _Navbar } from '../components/Nav';
import logo from "../assets/images/logo14.png";
import img from "../assets/icons/img.svg";
import Pagination from '../components/Pagination';
// import Breadcrumb from 'react-bootstrap/Breadcrumb';

let usd = Intl.NumberFormat('en-US', {
    style:'currency',
    currency: 'USD'
 })

export default function Search() {
const year = new Date().getFullYear();
const dispatch = useDispatch();
const { loader, products } = useSelector((state:any) => state.product);
const realProducts = products.filter((product:any)=> {  return product.category !== 'featured'; });
const params = useParams();
const search = params.q;
const searchResult:any[] = [];
realProducts.map((p:any) => {
    if (p.name.toLowerCase().includes(search!.toLowerCase())){
        searchResult.push(p);
    }
// if (p.name.toLowerCase().includes(search!.toLowerCase()) || p.keyword.toLowerCase(search!.toLowerCase())){
//     searchResult.push(p);
// }
})
console.log(searchResult, searchResult.length);
const [currentPage, setCurrentPage] = useState<number>(1);
const [productsPerPage, setproductsPerPage] = useState<number>(8);
const indexofLastProduct = currentPage * productsPerPage;
const indexofFirstProduct = indexofLastProduct - productsPerPage;
const currentProducts = searchResult.slice(indexofFirstProduct, indexofLastProduct);
const totalProducts = searchResult.length;
// const [start, setStart] = useState(1);
// const [end, setEnd] = useState(productsPerPage);

// if (currentPage !== 1) {
//     set
// }

const addItem = (item:Itemtype) => {
    dispatch(addItemToCart({...item,quantity:1}));
    toast.success("item added to cart");
}
const nextPage = (page:number) => {
if (currentPage < page) {
    setCurrentPage((val) => val + 1);
}}

const prevPage = () => {
if (currentPage > 1) {
    setCurrentPage((val) => val - 1);
}}

const paginate = (pageNumber:number) => {
    setCurrentPage(pageNumber);
}

  return (
    <>
    <header>
       <div className="header mb-5">
            <_Navbar/>
      </div>
    </header>
{ searchResult.length < 1 ?
          <section className="my-2 py-3 search_result d-flex justify-content-center align-items-center">
                <div className="container text-center">
                    <img src={img} alt="" />
                    <h4 className="mb-2">There is no result for "{search}"</h4>
                    <p>- Check your spelling for typing errors</p>
                    <p>- Try searching with short and simple keywords</p>
                    <p>- Try searching more general terms - you can then filter the search results</p>
                  <a href="/"><button className="mt-3 btn btn-success rounded-3">GO TO HOMEPAGE</button></a>
                </div>
            </section>
:
    <section className="top_items py-4">
    <nav className='breadcrumb-divider' aria-label="breadcrumb">
          <ol className="breadcrumb ms-2">
          <li className="breadcrumb-item"><a href="index.html">Home</a></li>
          <li className="breadcrumb-item"><a href="index.html">All product</a></li>
          <li className="breadcrumb-item active" aria-current="page">{search}</li>
          <li className="d-none breadcrumb-item active" aria-current="page">Search results for {search}</li>
        </ol>
      </nav>
    <div className="mt-4 mb-3 ms-2">
        <h2>Search Result for "{search}"</h2>
        <h5 className="text-muted">Showing {indexofFirstProduct+1}-{indexofLastProduct > totalProducts ? totalProducts : indexofLastProduct} products from {totalProducts} products</h5>
    </div>

      <div className="wrapper-container mb-4">
            { loader ? "loading" : currentProducts.map((product:Itemtype, i:any) => {
            return <div className="item mtl" key={i}>
              <a href={`/desc/${product._id}`}>
                  <img src={require("../assets/"+product.photos[0])} alt=""/>
                  <div className="b_text px-3">
                        <h6>{(product.name).length > 40 ? (product.name).slice(0,40)+"..." : product.name}</h6>
                        <h5 className="text-muted">{usd.format(product.price)}</h5>
                        <del><h6 className="text-muted mb-3">{product.prevprice ? usd.format(product.prevprice) : <span>&nbsp;</span>}</h6></del>
                  </div>
               </a>
                  <div className="pb-3 px-3">
                             <button className="btn btn-primary w-100" 
                             onClick={()=>{addItem(product)}}
                             >
                              ADD TO CART
                              </button>
                        </div>
            </div> })} 
      </div>

{
searchResult.length > productsPerPage && 
<Pagination 
productsPerPage={productsPerPage} 
totalProducts={totalProducts} 
currentPage ={currentPage}
paginate={paginate} 
nextPage={nextPage}
prevPage={prevPage}
/> 
}
</section>
}
<footer>
 <div className="footer">
    <div className="container">
       <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
             <img className="logo1" src={logo} alt="logo"/>
             <ul className="social_icon">
                <li><a href="www.facebook.com"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                <li><a href="www.x.com"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                <li><a href="www.linkedin.com"><i className="fa fa-linkedin-square" aria-hidden="true"></i></a></li>
                <li><a href="www.instagram.com"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
             </ul>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
             <h3>Get to Know Us</h3>
             <ul className="about_us">
          <li>About Us</li>
          <li>Service Center</li>
          <li>Blog</li>
          <li>Privacy Policy</li>
          <li>Our Location</li>
             </ul>
          </div>
          <div id="conta" className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
             <h3>Contact Us</h3>
             <ul className="conta">
               <li>My Orders</li>
               <li>My Wishlist</li>
               <li>Trade in or Cash Back</li>
               <li>Return Policy</li>
               <li>Pay On Delivery</li>
             </ul>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
             <form className="bottom_form">
                <h3>Newsletter</h3>
                <input className="enter" placeholder="Enter your email" type="text" name="Enter your email" />
                <button className="sub_btn">subscribe</button>
             </form>
          </div>
       </div>
    </div>
    <div className="copyright">
       <div className="container">
          <div className="row">
             <div className="col-md-12">
                <p>All Rights Reserved. digistore.com &copy; {year}</p>
             </div>
          </div>
       </div>
    </div>
 </div>
</footer>
</>
  )
}
