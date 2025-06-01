import { useEffect, useState } from 'react'
import logo from '../assets/images/logo14.png'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import XIcon from '@mui/icons-material/X'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { useLocation } from 'react-router-dom'

export const Footer = () => {
  const location = useLocation()
  const pathname = location.pathname
  const [scr, setscr] = useState(false)
  useEffect(() => {
    if (pathname == '/') {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 4500) {
          setscr(true)
        } else {
          setscr(false)
        }
      })
    }
  }, [pathname])

  return (
    <>
      <footer>
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <img className="logo1" src={logo} alt="#" />
                <ul className="social_icon">
                  <li>
                    <a href="#">
                      <XIcon />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FacebookRoundedIcon />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <GitHubIcon />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <LinkedInIcon />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <InstagramIcon />
                    </a>
                  </li>
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
                  <input
                    className="enter"
                    placeholder="Enter your email"
                    type="text"
                    name="Enter your email"
                  />
                  <p className="text-start">
                    <button className="btn btn-success rounded-3 px-5 py-2">
                      SUBSCRIBE
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className="copyright">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <p>
                    All Rights Reserved. digistore.com &copy;{' '}
                    {new Date().getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {scr && (
        <a id="scr" href="#top">
          <i className="fa fa-angle-up"></i>
        </a>
      )}
    </>
  )
}
