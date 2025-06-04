import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import "../styles/font-awesome.min.css";
import "../styles/bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import "../styles/desc.css";

export default function PrivateLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawer, toggleDrawer] = useState(false); // Access the Slider state and toggle function
  const { currentUser } = useSelector((state: any) => state.user);
  const sidenav = () => {
    toggleDrawer((prev) => !prev);
  };
  const drawerClose = {
    left: "-100%",
  };
  const drawerOpen = {
    left: "0",
  };
  const logout = () => {
    try {
      axios.post("/api/auth/logout").then((res: any) => {
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
    }
  };
  return currentUser == null ? (
    <Navigate to="/login" />
  ) : (
    <>
      <Header />
      <section className="item_desc py-4" style={{ backgroundColor: "#fff" }}>
        <div className="container">
          <div className="row gap-2">
            <div
              className="col-lg-3"
              id="wrap"
              style={drawer ? drawerOpen : drawerClose}
            >
              <ul className="acct_item rounded-3">
                <div
                  style={{ position: "relative" }}
                  id="xcon"
                  onClick={sidenav}
                >
                  {" "}
                  <i
                    className="text-white fa fa-times fa-1_5x mt-2"
                    style={{
                      borderRadius: "50%",
                      position: "absolute",
                      left: "80%",
                      cursor: "pointer",
                    }}
                  ></i>
                </div>
                <li className="bbot">
                  <a href="" className="acct_nav">
                    <i className="fa fa-user-o me-2" aria-hidden="true"></i>My
                    Digi Account
                  </a>
                </li>
                <li onClick={sidenav}>
                  <Link to="/orders" className="acct_nav">
                    <i
                      className="fa fa-shopping-basket me-2"
                      aria-hidden="true"
                    ></i>
                    Orders
                  </Link>
                </li>
                <li onClick={sidenav}>
                  <Link to="/inbox" className="acct_nav">
                    <i className="fa fa-envelope-o me-2" aria-hidden="true"></i>
                    Inbox
                  </Link>
                </li>
                <li onClick={sidenav}>
                  <Link to="/reviews" className="acct_nav">
                    <i
                      className="fa fa-pencil-square me-2"
                      aria-hidden="true"
                    ></i>
                    Pending reviews
                  </Link>
                </li>
                <li onClick={sidenav}>
                  <Link to="/voucher" className="acct_nav">
                    <i
                      className="fa fa-credit-card me-2"
                      aria-hidden="true"
                    ></i>
                    Voucher
                  </Link>
                </li>
                <li onClick={sidenav}>
                  <Link to="/saved-items" className="acct_nav">
                    <i className="fa fa-heart-o me-2" aria-hidden="true"></i>
                    Saved Items
                  </Link>
                </li>
                <li className="bbot" onClick={sidenav}>
                  <Link to="#" className="acct_nav">
                    <i className="fa fa-clock-o me-2" aria-hidden="true"></i>
                    Recently Viewed
                  </Link>
                </li>
                <li onClick={sidenav}>
                  <Link to="#" className="acct_nav">
                    Account Mangement
                  </Link>
                </li>
                <li onClick={sidenav}>
                  <Link to="/address-book" className="acct_nav">
                    Address Book
                  </Link>
                </li>
                <li onClick={sidenav}>
                  <Link to="/newsletter-preference" className="acct_nav">
                    Newsletter Preferences
                  </Link>
                </li>
                <li onClick={sidenav}>
                  <Link to="#" className="acct_nav">
                    Close Account
                  </Link>
                </li>
                <li className="btop">
                  <a href="#" className="nav_btn p-3" onClick={logout}>
                    LOGOUT
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-8_5">
              <div onClick={sidenav}>
                <i
                  className="fa fa-bars fa-1_5x"
                  id="but"
                  style={{ cursor: "pointer" }}
                ></i>{" "}
              </div>
              <div
                className="acct_wrap rounded-3"
                style={{ backgroundColor: "#f2f2f2" }}
              >
                <div className="body_box">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
