import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo14.png";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";

export const AdminLogin = () => {
  const { loading, error } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = "You do not have admin access";
    axios
      .post("/api/auth/login", values)
      .then((res) => {
        dispatch(signInStart());
        const userDetails = res.data.details;
        // Check if user is admin
        if (userDetails.role === "admin" || userDetails.role === "owner") {
          setTimeout(() => {
            dispatch(signInSuccess(userDetails));
          }, 1000);
          setTimeout(() => {
            navigate("/admin/overview");
          }, 1500);
        } else {
          dispatch(signInFailure(error));
        }
      })
      .catch(() => {
        dispatch(signInFailure(error));
      });
  };

  return (
    <>
      <section className="authsec">
        <div className="section">
          <div className="signin">
            <div className="content">
              <div className="img">
                <img src={logo} alt="" />
              </div>
              <h2>Admin Sign In</h2>
              <p
                style={{
                  textAlign: "center",
                  fontSize: "0.9rem",
                  color: "#666",
                  marginBottom: "1.5rem",
                }}
              >
                Authorized Personnel Only
              </p>
              <form className="form" onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <small>{error}</small>
                  </div>
                )}
                <div className="inputBox">
                  <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleInput}
                    placeholder="Admin Email"
                    required
                  />
                </div>
                <div className="inputBox">
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleInput}
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="inputBox">
                  <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Admin Login"}
                  </button>
                </div>
                <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                  <a
                    href="/"
                    style={{ color: "#007bff", textDecoration: "none" }}
                  >
                    ← Back to Store
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
