import { useEffect, useState } from 'react';
import logo from '../assets/images/logo14.png';
import XIcon from '@mui/icons-material/X'


export const Footer = () => {

    const [scr, setscr] = useState(false);
    useEffect (() => {
       window.addEventListener('scroll', ()=> {
        if (window.scrollY > 4500) {
            setscr(true) ;
        }
        else {
            setscr(false) ;
        }
       });
},[]);

    return (
        <>
        <footer>
         <div className="footer">
            <div className="container">
               <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                     <img className="logo1" src={logo} alt="#"/>
                     <ul className="social_icon">
                     <li>
                           <a href="#">
                              {/* <i className="fa fa-facebook" aria-hidden="true"></i> */}
                              <XIcon/>
                           </a>
                     </li>
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
                        <p>All Rights Reserved. digistore.com &copy; {new Date().getFullYear()}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
      {scr && <a id="scr" href="#top"><i className="fa fa-angle-up"></i></a>}
        </>
    );
};