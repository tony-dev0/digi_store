import {Container, Form, Nav, Navbar} from 'react-bootstrap';
import logo from '../assets/images/logo14.png';
import Search from '../components/search';
import { Link } from 'react-router-dom';
import nopage from '../assets/images/404.png';

export const ErrorPage = () => {

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
             <section className="my-3 py-3">
                <div className="container nopage-box">
                  <img className="nopage" src={nopage} alt="" />
                  <Link to="/">
                  <button className="btn btn-success rounded-3">
                      START SHOPPING
                      </button>
                  </Link>
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
