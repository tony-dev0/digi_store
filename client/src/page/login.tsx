import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo14.png";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  resetError,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export const Login = () => {
  const { loading, error } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetError());
  }, []);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("/api/auth/login", values)
      .then((res) => {
        dispatch(signInStart());
        setTimeout(() => {
          dispatch(signInSuccess(res.data.details));
        }, 2000);
        setTimeout(() => {
          navigate("/");
        }, 2500);
      })
      .catch((err) => {
        // console.log(err);
        dispatch(
          signInFailure(err?.response?.data?.message || err?.response?.data),
        );
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
              <h2>Sign In</h2>
              <form className="form" onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <small> {error} </small>
                  </div>
                )}
                <div className="inputBox">
                  <input
                    type="text"
                    name="email"
                    onChange={handleInput}
                    placeholder="email"
                    required
                  />
                </div>
                <div className="inputBox">
                  <input
                    type="password"
                    name="password"
                    onChange={handleInput}
                    placeholder="password"
                    required
                  />
                </div>
                <div className="links">
                  <a href="#">Forgot Password?</a>
                  <a href="/register">Signup</a>
                </div>
                <div className="inputBox">
                  <button type="submit">
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
                <OAuth />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
