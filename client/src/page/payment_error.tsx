import {Container, Form, Nav, Navbar} from 'react-bootstrap';
import error from '../assets/icons/close.png';
import logo from '../assets/images/logo14.png';
import Search from '../components/search';
import { Link } from 'react-router-dom';

export default function paymentError() {
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
             <section className="msg-section my-3 py-3">
                <div className="container d-flex justify-content-center">
                   <div className="box-info">
                        <div className="box-info-content">
                           <div className="icon">
                              <img src={error} alt="" width={40}/>
                           </div>
                           <div className="box-info-text">
                            <p><h3>Payment Cancelled!</h3></p>
                             <p>Your Have Cancelled Your Order. if there is a problem
                                 please don't hesistate to Contact us </p>
                           </div>
                           <div className="box-info-footer">
                             <button className="btn btn-secondary p-2">Go to Homepage</button>
                           </div>
                        </div>
                   </div>
                </div>
            </section>
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
                         <p>All Rights Reserved. digistore.com &copy; {new Date().getFullYear()}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
    </div>
  )
}
