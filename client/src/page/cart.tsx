import emptycart from '../assets/icons/cart_empty.svg';
import logo from "../assets/images/logo14.png";
import shipping from "../assets/images/img/shipping.png";
import delivery from "../assets/images/img/delivery.png"
import warranty from "../assets/images/img/warranty.png";
import { useSelector, useDispatch } from 'react-redux';
import { Topitems } from '../sections/Products';
import {Button, Container, Form, Nav, Navbar} from 'react-bootstrap';
import { increaseItemQuantity, decreaseItemQuantity, clearCart, removeItemFromCart } from '../redux/cart/cartSlice';
import { Link } from 'react-router-dom';
import Search from '../components/search';
// import { useLocation } from 'react-router-dom';

let usd = Intl.NumberFormat('en-US', {
   style:'currency',
   currency: 'USD'
})

export default function Cart() {

   const year = new Date().getFullYear();
   const dispatch = useDispatch();
   const { items, totalQuantity, totalAmount } = useSelector((state:any) => state.cart);
  return (
    <div>
      <header>
         <div className="header" id="top">
         <Navbar expand="lg" className='navbar-dark'>
      <Container fluid>
        <Navbar.Brand href="#"><img src={logo} alt="" className="logo-image"/></Navbar.Brand>
     <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="navbar-nav me-auto mb-4 mb-lg-0">
            <li className='nav-item mt-20px'><Nav.Link href="/">Home</Nav.Link></li>
            <li className='nav-item mt-20px'><Nav.Link href="/#about">About</Nav.Link></li>
            <li className='nav-item mt-20px'><Nav.Link href="/#product">Products</Nav.Link></li>
            <li className='nav-item mt-20px'><Nav.Link href="/#contact">Contact Us</Nav.Link> </li>
          </Nav>
<div className="mx-3"></div>
         <Search />
        </Navbar.Collapse>
      </Container>
    </Navbar>

               </div>
      </header>
      {items.length < 1 ? <section className="my-3 py-3 search_result d-flex justify-content-center align-items-center">
                <div className="container text-center">
                    <img src={emptycart} alt="" />
                    <h4 className="mt-4 mb-2">Your cart is empty!</h4>
                    <p>Browse our categories and discover our best deals!</p>
                  <Link to="/"><button className="mt-3 btn btn-success rounded-3">START SHOPPING</button></Link>
                </div>
            </section> :
      <section className="cart my-5 px-3">
                <div className="container">
                    <div className="row gap-3">
                        <div className="col8 col-lg-8">
                          <div className="d-flex justify-content-between align-items-center"><h4>Cart({totalQuantity})</h4><button className="rmbtn btn-sm" onClick={()=>{dispatch(clearCart())}}><i className="me-1 fa fa-trash-o" aria-hidden="true"></i> Clear </button></div> 
                            { items.map((cartItems:Itemtype, i:any) => {
                            return <div key={i}>
                              <hr/>
                              <div className="cart_details d-flex justify-content-between align-items-center">
                                 <div className="cart_details_desc d-flex align-items-center gap-3">
                            <Link to={`/desc/${cartItems._id}`} className='cursor-pointer'><img className="rounded img-thumbnail" src={require("../assets/"+cartItems.photos[0])} alt="" /> </Link>  
                                  <div className="cart_desc">
                                    <h6>{cartItems.name}</h6>
                                    <small>few units left</small>
                                    <small className="text-muted"> Gigi store</small>
                                  </div>
                                 </div>
                                  <h3>{usd.format(cartItems.price)}</h3>
                              </div>
                              <div className="mt-2 cart_qty d-flex justify-content-between align-items-center">
                                 <button className="rmbtn btn-sm" onClick={()=>{dispatch(removeItemFromCart(cartItems._id))}}><i className="me-1 fa fa-trash-o" aria-hidden="true"></i> Remove </button>
                                 <div className="qtyaos d-flex">
                                   <button className="qtyadd px-3 py-1" onClick={()=>{dispatch(increaseItemQuantity(cartItems._id))}}><i className="fa fa-plus" aria-hidden="true"></i></button> 
                                   <div className="qtyval text-center border-1"> {cartItems.quantity} </div>
                                   <button className="qtysub px-3 py-1"onClick={()=>{dispatch(decreaseItemQuantity(cartItems._id))}}><i className="fa fa-minus" aria-hidden="true"></i></button> 
                                 </div>
                              </div>
                     </div>
                     })}
                  </div>
                        <div className="col4 col-lg-3">
                            <div className="">Cart Summary</div>
                            <hr/>
                            <div className="total d-flex justify-content-between">
                                  <h4>Subtotal</h4>
                                  <h4>{usd.format(totalAmount)}</h4>
                            </div>
                            <hr/>
                           <h4 className="text-center"><button className="btn btn-success">Checkout({usd.format(totalAmount)})</button></h4>
                        </div>

                    </div> 
                </div>
            
         </section>
      }
      <Topitems />
            <section className="my-5">
                <div className="container">
                <div className="row gx-0">
                    <div className="card_box col-lg-4">
                      <div className="pr1 d-flex gap-3">
                        <img className="value-icon" src={delivery} alt="delivery"/>
                        <div className="value-info">
                              <h4>Fast Delivery</h4>
                              <p>To more than 11 states</p>
                        </div>
                      </div>
                    </div>
                    <div className="card_box col-lg-4">
                        <div className="pr1 d-flex gap-3">
                            <img className="value-icon" src={shipping} alt="shipping"/>
                            <div className="value-info">
                              <h4>Free Shipping</h4>
                              <p>For orders above 100,000 ₦ (T&C Apply)</p>
                        </div>
                        </div>
                    </div>
                    <div className="card_box col-lg-4">
                        <div className="pr1 d-flex gap-3">
                          <img className="value-icon" src={warranty} alt="warranty"/>
                          <div className="value-info">
                            <h4>Item Warranty</h4>
                            <p>No worries whatsoever.</p>
                      </div>
                        </div>
                    </div>
                  </div>
                </div>
            </section>
      {/* <!--  footer --> */}
      <footer>
         <div className="footer">
            <div className="container">
               <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                     <img className="logo1" src={logo} alt="#"/>
                     <ul className="social_icon">
                        <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fa fa-linkedin-square" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
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
                        <input className="enter" placeholder="Enter your email" type="text" name="Enter your email"/>
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
    </div>
  )
}
