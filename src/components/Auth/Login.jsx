import React from "react";
import Navbar from "../Home/Navbar";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Vector from "../images/loginpic.svg";
import {FcGoogle} from "react-icons/fc"
import {FaFacebook} from "react-icons/fa"
import {FiUserCheck} from "react-icons/fi"
import Back from "../Images/back.jpg"

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
        <img className="login-back" src={Back} />
          <div className="loginContainer">
             <div className="login-info">
                  <h1>Log in to use Whiteboard</h1>
                  <p>Increase your social presence</p>
                  <button className="social-btn login-btn" >
                    <FiUserCheck />
                    Try out!
                  </button>
                  <Link to="/signin" style={{width:"100%"}}>
                    <button className="login-btn sign-in">
                      Sign In
                    </button>
                  </Link>
                  <p className="login-foot">
                    <Link to="/register">Create an account</Link>
                  </p>
              </div>
            
          </div>
      </div>
    </>
  );
}

export default Login;