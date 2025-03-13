import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo14.png";
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { signOutUserFailure, signOutUserSuccess } from "../redux/user/userSlice";
import Search from "./search";

export const _Navbar = () => {

const { totalQuantity } = useSelector((state:any) => state.cart);
// const [ishome, setisHome] = useState<boolean>();
let ishome = false;
  const location = useLocation();
  if (location.pathname == '/') {
    ishome = true;
    // setisHome(true);
  }
  else {
    ishome = false;
    // setisHome(false);
  }
    return (
      <Navbar expand="lg" className='navbar-dark'>
      <Container fluid>
        <Navbar.Brand href="#"><img src={logo} alt="" className="logo-image"/></Navbar.Brand>

{!ishome && <div className="cartbtn mobilecart" id="cartbtn"> 
    <Link to="/cart" className="blank" style={{position:'relative'}}>
    {totalQuantity > 0 && <div className="dot" style={{display:'flex', justifyContent:'center',alignItems:'center',width:'13px',height:'13px',fontSize:'8px',backgroundColor: 'red',position:'absolute',top:'-8px',left:'11px',borderRadius:'50%'}}><span>{totalQuantity > 99 ? '99+' : totalQuantity}</span></div> }
    <svg id="svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.39 11.5C10.39 11.09 10.73 10.75 11.14 10.75H12.39V9.5C12.39 9.09 12.73 8.75 13.14 8.75C13.55 8.75 13.89 9.09 13.89 9.5V10.75H15.14C15.55 10.75 15.89 11.09 15.89 11.5C15.89 11.91 15.55 12.25 15.14 12.25H13.89V13.5C13.89 13.91 13.55 14.25 13.14 14.25C12.73 14.25 12.39 13.91 12.39 13.5V12.25H11.14C10.73 12.25 10.39 11.91 10.39 11.5ZM11.25 18.75C11.25 19.58 10.58 20.25 9.75 20.25C8.92 20.25 8.25 19.58 8.25 18.75C8.25 17.92 8.92 17.25 9.75 17.25C10.58 17.25 11.25 17.92 11.25 18.75ZM17.75 18.75C17.75 19.58 17.08 20.25 16.25 20.25C15.42 20.25 14.75 19.58 14.75 18.75C14.75 17.92 15.42 17.25 16.25 17.25C17.08 17.25 17.75 17.92 17.75 18.75ZM20.73 7.68L18.73 15.68C18.65 16.01 18.35 16.25 18 16.25H8C7.64 16.25 7.33 15.99 7.26 15.63L5.37 5.25H4C3.59 5.25 3.25 4.91 3.25 4.5C3.25 4.09 3.59 3.75 4 3.75H6C6.36 3.75 6.67 4.01 6.74 4.37L7.17 6.75H20C20.23 6.75 20.45 6.86 20.59 7.04C20.73 7.22 20.78 7.46 20.73 7.68ZM19.04 8.25H7.44L8.62 14.75H17.41L19.03 8.25H19.04Z" fill="currentColor"/>
              </svg>
              <span></span>
      </Link>
</div>}

     <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="navbar-nav me-auto mb-4 mb-lg-0">
            <li className='nav-item mt-20px'><Nav.Link className={ishome ? "active" : ""} href="/">Home</Nav.Link></li>
            <li className='nav-item mt-20px'><Nav.Link href="/">About</Nav.Link></li>
            <li className='nav-item mt-20px'><Nav.Link href="/">Products</Nav.Link></li>
            <li className='nav-item mt-20px'><Nav.Link href="/">Contact Us</Nav.Link> </li>
          </Nav>

{!ishome && <div className="cartbtn desktopcart" id="cartbtn"> 
        <Link to="/cart" className="blank" style={{position:'relative'}}>
        {totalQuantity > 0 && <div className="dot" style={{display:'flex', justifyContent:'center',alignItems:'center',width:'13px',height:'13px',fontSize:'8px',backgroundColor: 'red',position:'absolute',top:'-8px',left:'11px',borderRadius:'50%'}}><span>{totalQuantity > 99 ? '99+' : totalQuantity}</span></div> }
        <svg id="svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.39 11.5C10.39 11.09 10.73 10.75 11.14 10.75H12.39V9.5C12.39 9.09 12.73 8.75 13.14 8.75C13.55 8.75 13.89 9.09 13.89 9.5V10.75H15.14C15.55 10.75 15.89 11.09 15.89 11.5C15.89 11.91 15.55 12.25 15.14 12.25H13.89V13.5C13.89 13.91 13.55 14.25 13.14 14.25C12.73 14.25 12.39 13.91 12.39 13.5V12.25H11.14C10.73 12.25 10.39 11.91 10.39 11.5ZM11.25 18.75C11.25 19.58 10.58 20.25 9.75 20.25C8.92 20.25 8.25 19.58 8.25 18.75C8.25 17.92 8.92 17.25 9.75 17.25C10.58 17.25 11.25 17.92 11.25 18.75ZM17.75 18.75C17.75 19.58 17.08 20.25 16.25 20.25C15.42 20.25 14.75 19.58 14.75 18.75C14.75 17.92 15.42 17.25 16.25 17.25C17.08 17.25 17.75 17.92 17.75 18.75ZM20.73 7.68L18.73 15.68C18.65 16.01 18.35 16.25 18 16.25H8C7.64 16.25 7.33 15.99 7.26 15.63L5.37 5.25H4C3.59 5.25 3.25 4.91 3.25 4.5C3.25 4.09 3.59 3.75 4 3.75H6C6.36 3.75 6.67 4.01 6.74 4.37L7.17 6.75H20C20.23 6.75 20.45 6.86 20.59 7.04C20.73 7.22 20.78 7.46 20.73 7.68ZM19.04 8.25H7.44L8.62 14.75H17.41L19.03 8.25H19.04Z" fill="currentColor"/>
            </svg>
            <span></span>
          </Link>
      </div>}
<div className="mx-3"></div>
<Search />
          {/* <Form className="d-flex" id="form">
            <Form.Control
              type="search"
              placeholder="Search a product"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
      );
 };

const _Navmenu = () => {
  const [cartFloat, setcartFloat] = useState(false);
  useEffect (() => {
     window.addEventListener('scroll', ()=> {
      if (window.scrollY > 1213 && window.scrollY < 4000) {
          setcartFloat(true) ;
      }
      else {
          setcartFloat(false) ;
      }
     });
},[]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state:any) => state.user);
  const { totalQuantity } = useSelector((state:any) => state.cart);
const logout = () => {
  try{
    axios.post('/api/auth/logout').then((res:any) => {
      if (res.success === false) {
        dispatch(signOutUserFailure(res.message));
        return;
      }
      dispatch(signOutUserSuccess(res));
      toast.success(res.message || "You have been logged out");
       navigate("/login");
  }); 
} catch (error) {
  dispatch(signOutUserFailure(error));
}}
  return (
  <div className="oth d-flex gap-5">
    <Navbar collapseOnSelect className="gap-1" id="cartbtn">
          <svg id="svg" width="30px" height="30px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none">
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -2159.000000)" fill="#fff">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                          <path d="M134,2008.99998 C131.783496,2008.99998 129.980955,2007.20598 129.980955,2004.99998 C129.980955,2002.79398 131.783496,2000.99998 134,2000.99998 C136.216504,2000.99998 138.019045,2002.79398 138.019045,2004.99998 C138.019045,2007.20598 136.216504,2008.99998 134,2008.99998 M137.775893,2009.67298 C139.370449,2008.39598 140.299854,2006.33098 139.958235,2004.06998 C139.561354,2001.44698 137.368965,1999.34798 134.722423,1999.04198 C131.070116,1998.61898 127.971432,2001.44898 127.971432,2004.99998 C127.971432,2006.88998 128.851603,2008.57398 130.224107,2009.67298 C126.852128,2010.93398 124.390463,2013.89498 124.004634,2017.89098 C123.948368,2018.48198 124.411563,2018.99998 125.008391,2018.99998 C125.519814,2018.99998 125.955881,2018.61598 126.001095,2018.10898 C126.404004,2013.64598 129.837274,2010.99998 134,2010.99998 C138.162726,2010.99998 141.595996,2013.64598 141.998905,2018.10898 C142.044119,2018.61598 142.480186,2018.99998 142.991609,2018.99998 C143.588437,2018.99998 144.051632,2018.48198 143.995366,2017.89098 C143.609537,2013.89498 141.147872,2010.93398 137.775893,2009.67298" id="profile-[#1341]" fill="currentColor">
          </path>
                      </g>
                  </g>
              </g>
          </svg>  
         
        {currentUser ?
        <NavDropdown title={currentUser.username} id="basic-nav-dropdown">
        <NavDropdown.Item href="/account">Account</NavDropdown.Item>
        <NavDropdown.Item href="/orders">
          Orders
        </NavDropdown.Item>
        <NavDropdown.Item href="/inbox">Inbox</NavDropdown.Item>
        <NavDropdown.Item href="/saved-items">Saved Items</NavDropdown.Item>
        <NavDropdown.Item href="/voucher">Voucher</NavDropdown.Item>
        <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
        <NavDropdown.Divider />
        <div className="ms-3">
        <button className="btn btn-outline-primary" onClick={logout}>Logout</button>
        </div>
    </NavDropdown> 
        : 
        <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item href="/login">My Account</NavDropdown.Item>
            <NavDropdown.Item href="/login">
              Orders 
            </NavDropdown.Item>
            <NavDropdown.Item href="/login">Saved Items</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/login">
            <button className="btn btn-primary">SIGN IN</button>
            </NavDropdown.Item>
        </NavDropdown> }
  </Navbar>
  <div className="cartbtn" id="cartbtn"> 
  <a href="#" className="blank">
    <svg id="svg" xmlns="http://www.w3.org/2000/svg" fill="none" width="30px" height="30px" viewBox="0 0 24 24">
              <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" fill="currentColor"/>
      </svg> 
    </a>
    <div>
      <Navbar collapseOnSelect className="">
          <NavDropdown title="Help" id="nav-dropdown">
              <NavDropdown.Item href="#action/iop">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/pop">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/klo">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/ftu">
                Separated link
              </NavDropdown.Item>
          </NavDropdown>
          </Navbar>
        </div>
      </div>
      {/* when cart is 99+
      width: 16px;
      height: 14px;
      font-size: 8px; */}
   <div className="d-flex gap-1 align-items-center" id="cartbtn"> 
    <Link to="/cart" className="blank" style={{position:'relative'}}>
   {totalQuantity > 0 && <div className="dot" style={{display:'flex', justifyContent:'center',alignItems:'center',width:'13px',height:'13px',fontSize:'8px',backgroundColor: 'red',position:'absolute',top:'-8px',left:'11px',borderRadius:'50%'}}><span>{totalQuantity > 99 ? '99+' : totalQuantity}</span></div> }
      <svg id="svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M10.39 11.5C10.39 11.09 10.73 10.75 11.14 10.75H12.39V9.5C12.39 9.09 12.73 8.75 13.14 8.75C13.55 8.75 13.89 9.09 13.89 9.5V10.75H15.14C15.55 10.75 15.89 11.09 15.89 11.5C15.89 11.91 15.55 12.25 15.14 12.25H13.89V13.5C13.89 13.91 13.55 14.25 13.14 14.25C12.73 14.25 12.39 13.91 12.39 13.5V12.25H11.14C10.73 12.25 10.39 11.91 10.39 11.5ZM11.25 18.75C11.25 19.58 10.58 20.25 9.75 20.25C8.92 20.25 8.25 19.58 8.25 18.75C8.25 17.92 8.92 17.25 9.75 17.25C10.58 17.25 11.25 17.92 11.25 18.75ZM17.75 18.75C17.75 19.58 17.08 20.25 16.25 20.25C15.42 20.25 14.75 19.58 14.75 18.75C14.75 17.92 15.42 17.25 16.25 17.25C17.08 17.25 17.75 17.92 17.75 18.75ZM20.73 7.68L18.73 15.68C18.65 16.01 18.35 16.25 18 16.25H8C7.64 16.25 7.33 15.99 7.26 15.63L5.37 5.25H4C3.59 5.25 3.25 4.91 3.25 4.5C3.25 4.09 3.59 3.75 4 3.75H6C6.36 3.75 6.67 4.01 6.74 4.37L7.17 6.75H20C20.23 6.75 20.45 6.86 20.59 7.04C20.73 7.22 20.78 7.46 20.73 7.68ZM19.04 8.25H7.44L8.62 14.75H17.41L19.03 8.25H19.04Z" fill="currentColor"/>
         </svg>
         <span>Cart</span>
      </Link>
 </div>

{ cartFloat && <div className="cartbtn fixed_cart" id="cartbtn"> 
    <Link to="/cart" className="blank" style={{position:'relative'}}>
    {totalQuantity > 0 && <div className="dot" style={{display:'flex', justifyContent:'center',alignItems:'center',width:'13px',height:'13px',fontSize:'8px',backgroundColor: 'red',position:'absolute',top:'-8px',left:'11px',borderRadius:'50%'}}><span>{totalQuantity > 99 ? '99+' : totalQuantity}</span></div> }
    <svg id="svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.39 11.5C10.39 11.09 10.73 10.75 11.14 10.75H12.39V9.5C12.39 9.09 12.73 8.75 13.14 8.75C13.55 8.75 13.89 9.09 13.89 9.5V10.75H15.14C15.55 10.75 15.89 11.09 15.89 11.5C15.89 11.91 15.55 12.25 15.14 12.25H13.89V13.5C13.89 13.91 13.55 14.25 13.14 14.25C12.73 14.25 12.39 13.91 12.39 13.5V12.25H11.14C10.73 12.25 10.39 11.91 10.39 11.5ZM11.25 18.75C11.25 19.58 10.58 20.25 9.75 20.25C8.92 20.25 8.25 19.58 8.25 18.75C8.25 17.92 8.92 17.25 9.75 17.25C10.58 17.25 11.25 17.92 11.25 18.75ZM17.75 18.75C17.75 19.58 17.08 20.25 16.25 20.25C15.42 20.25 14.75 19.58 14.75 18.75C14.75 17.92 15.42 17.25 16.25 17.25C17.08 17.25 17.75 17.92 17.75 18.75ZM20.73 7.68L18.73 15.68C18.65 16.01 18.35 16.25 18 16.25H8C7.64 16.25 7.33 15.99 7.26 15.63L5.37 5.25H4C3.59 5.25 3.25 4.91 3.25 4.5C3.25 4.09 3.59 3.75 4 3.75H6C6.36 3.75 6.67 4.01 6.74 4.37L7.17 6.75H20C20.23 6.75 20.45 6.86 20.59 7.04C20.73 7.22 20.78 7.46 20.73 7.68ZM19.04 8.25H7.44L8.62 14.75H17.41L19.03 8.25H19.04Z" fill="currentColor"/>
              </svg>
              <span></span>
      </Link>
</div>}
    </div>
  );
};

export const NavComp = () => {
    return (
      <>
    <div className="header" id="top">
      <_Navbar/>
      <_Navmenu/>
    </div>
    </>
    );
  };
  
  // export default NavComp;