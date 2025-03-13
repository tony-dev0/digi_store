import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate, Link } from 'react-router-dom';
import '../styles/font-awesome.min.css';
import '../styles/bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
import '../styles/desc.css';
import logo from "../assets/images/logo14.png";
import Search from './search';

export default function PrivateLayout() {
  const [drawer, toggleDrawer] = useState(false); // Access the Slider state and toggle function
  const { currentUser } = useSelector((state:any) => state.user);
  const year = new Date().getFullYear();
  const sidenav = () => {
    toggleDrawer((prev) => !prev);
  }
  const drawerClose = {
    left: "-100%"
  }
  const drawerOpen = {
    left: "0"
  }
  
  return currentUser == null 
  ?
 <Navigate to='/login' /> 
  :
 <><header>
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src={logo} alt="" className="logo-image" />
            </a>
            <button style={{ outline: "none", boxShadow: "none" }} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-4 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Products</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact Us</a>
                </li>
              </ul>
              <Search />
            </div>
          </div>
        </nav>
      </div>
    </header><section className="item_desc py-4">
        <div className="container">
          <div className="row gap-2">
            <div className="col-lg-3" id="wrap" style={drawer ? drawerOpen : drawerClose}>
              <ul className="acct_item rounded-3">

                {/* <div style={{position:"relative"}} id="xcon"> <button className="btn btn-close-white" style={{borderRadius:"50%", position:"absolute", left:"80%"}}>x</button></div> */}
                <div style={{position:"relative"}} id="xcon" onClick={sidenav}> <i className="text-white fa fa-times fa-1_5x mt-2" style={{borderRadius:"50%", position:"absolute", left:"80%", cursor:"pointer"}}></i></div>
                <li className="bbot"><a href="" className="acct_nav"><i className="fa fa-user-o me-2" aria-hidden="true"></i>My Gigi Account</a></li>
                <li><Link to="/orders" className="acct_nav"><i className="fa fa-shopping-basket me-2" aria-hidden="true"></i>Orders</Link></li>
                <li><Link to="/inbox" className="acct_nav"><i className="fa fa-envelope-o me-2" aria-hidden="true"></i>Inbox</Link></li>
                <li><Link to="/reviews" className="acct_nav"><i className="fa fa-pencil-square me-2" aria-hidden="true"></i>Pending reviews</Link></li>
                <li><Link to="/voucher" className="acct_nav"><i className="fa fa-credit-card me-2" aria-hidden="true"></i>Voucher</Link></li>
                <li><Link to="/saved-items" className="acct_nav"><i className="fa fa-heart-o me-2" aria-hidden="true"></i>Saved Items</Link></li>
                <li className="bbot"><Link to="#" className="acct_nav"><i className="fa fa-clock-o me-2" aria-hidden="true"></i>Recently Viewed</Link></li>
                <li><Link to="#" className="acct_nav">Account Mangement</Link></li>
                <li><Link to="/address-book" className="acct_nav">Address Book</Link></li>
                <li><Link to="/newsletter-preference" className="acct_nav">Newsletter Preferences</Link></li>
                <li><Link to="#" className="acct_nav">Close Account</Link></li>
                <li className="btop"><a href="#" className="nav_btn p-3">LOGOUT</a></li>
              </ul>
            </div>

            <div className="col-lg-8_5">
             <div onClick={sidenav}><i className="fa fa-bars fa-1_5x" id="but" style={{cursor:"pointer"}}></i> </div> 
              <div className="acct_wrap rounded-3" style={{backgroundColor:"#f2f2f2"}}>
                <div className="body_box">
                 <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>

      </section><footer>
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <img className="logo1" src={logo} alt="#" />
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
      </footer></>

 }
