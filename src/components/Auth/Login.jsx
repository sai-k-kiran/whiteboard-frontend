import React from "react";
import Navbar from "../Home/Navbar";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Vector from "../images/loginpic.svg";
import {FcGoogle} from "react-icons/fc"
import {FaFacebook} from "react-icons/fa"
import {FiUserCheck} from "react-icons/fi"

function Login() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { t } = useTranslation();

  // const demoLogin = (e) => {
  //   e.preventDefault();
  //   Axios.post(
  //     "https://localhost:3001/login",
  //     { email: "demo@demo.com", password: "12demo21omed87" },
  //     { withCredentials: true }
  //   ).then((response) => {
  //     dispatch(setCurrentUser(response.data));
  //     localStorage.setItem("user", JSON.stringify(response.data));
  //     navigate("/home/allDesigns");
  //   });
  // };


  return (
    <>
      <Navbar />
      <div className="login">
          <div className="loginContainer">
             <div className="login-info">
                  <h1>
                    Log in to use Whiteboard
                  </h1>
                  <p>Increase your social presence</p>
                  <button className="social-btn login-btn">
                    <FcGoogle />
                    Log in with Google
                  </button>
                  <button className="social-btn login-btn">
                    <FaFacebook />
                  Log in with facebook
                  </button>
                  <div className="striked-line">
                    <hr></hr>
                    <div className="OR">OR</div>
                    <hr></hr>
                  </div>
                  <button className="social-btn login-btn" >
                    <FiUserCheck />
                    Log in as a guest 
                  </button>
                  <Link to="/signin">
                    <button className="social-btn login-btn">
                      Sign in with whiteboard account instead
                    </button>
                  </Link>
                  <p className="login-foot">
                    <Link to="/register">Create an account</Link>
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

export default Login;