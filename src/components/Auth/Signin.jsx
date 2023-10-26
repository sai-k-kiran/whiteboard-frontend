import React, { useState } from "react";
import Navbar from "../Home/Navbar";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import Vector from "../images/loginpic.svg";
import { FaAngleDoubleLeft } from "react-icons/fa";
// import Axios from "axios";
// import { useDispatch } from "react-redux";
// import { setCurrentUser } from "../redux/User/UserActions";
// import { useTranslation } from "react-i18next";

function SignIn() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { t } = useTranslation();

  const handleChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;
    setData({ ...data, [input]: value });
  };

//   Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    // e.preventDefault();
    // Axios.post(
    //   "https://localhost:3001/login",
    //   { email: data.email, password: data.password },
    //   { withCredentials: true }
    // ).then((response) => {
    //   if (response) {
    //     dispatch(setCurrentUser(response.data.user));
    //     localStorage.setItem("user", JSON.stringify(response.data.user));
    //     navigate("/home/allDesigns");
    //   }
    // });
  };

  return (
    <>
        <Navbar />
        <div className="login">
            <div className="loginContainer">
            <div className="register-info">
          <h1>
            <Link to="/login">
              <FaAngleDoubleLeft />
            </Link>
            Sign In
          </h1>
          <p>Sign up</p>
          <form onSubmit={handleSubmit}>
            <input
              className="reg-input"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="E-mail"
            />
            <input
              className="reg-input"
              value={data.password}
              onChange={handleChange}
              name="password"
              placeholder="password"
            />
            <button className="signup-btn login-btn">Sign In</button>
          </form>
          <p className="login-foot">
            New to Whiteboard? <Link to="/register">Create an account</Link>
          </p>
        </div>
        <div className="login-pic">
          <img className="login-vector" src={Vector} alt="login-pic" />
        </div>
            </div>
        </div>

    </>
  );
}

export default SignIn;