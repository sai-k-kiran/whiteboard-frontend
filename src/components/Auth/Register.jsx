import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import Vector from "../images/loginpic.svg";
import { FaAngleDoubleLeft } from "react-icons/fa";
import Navbar from "../Home/Navbar";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/User/UserActions";
import { saveUser } from "../Services/client"; 

function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false)
  const [invalid, setInValid] = useState(true)

  function isValidEmail(email) {
    if(email.length != 0)
        return /\S+@\S+\.\S+/.test(email);
    return true
  }
 
  const setPassword = (e) => {
    setData((data) => ({ ...data, password: e.target.value }));
  }
  const setname = (e) => {
      setData((data) => ({ ...data, name: e.target.value }));
    }
  const setemail = (e) => {
      if(e.target.value == ""){
          setError(true)
      }
      else if(!isValidEmail(e.target.value)) {
        setError(true)
      } else {
        setError(null);
        setInValid(false)
      }
      setData((data) => ({ ...data, email: e.target.value }))
  }

  const handleSubmit = (data) => {
    saveUser(data).then((res) => {
      navigate("/signin")
    }).catch(err => console.log(err.response))
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
                        Create your account
                    </h1>
                    <p>We'll have you designing in no time.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                        className="reg-input"
                        name="name"
                        value={data.name}
                        onChange={e => setname(e)}
                        placeholder="Name"
                        />
                        <input
                        type="email"
                        className="reg-input"
                        name="email"
                        value={data.email}
                        onChange={e => setemail(e)}
                        placeholder="Email"
                        />
                        <div className="error">
                          {data.email.length != 0 && error ? (
                            <p>Email is invalid</p>
                          ) : ''}
                        </div>
                        <input
                        type="password"
                        className="reg-input"
                        name="password"
                        value={data.password}
                        onChange={e => setPassword(e)}
                        placeholder="Password"
                        />
                        <p className="login-foot">Use 6 or more characters</p>
                        <button onClick={() => handleSubmit(data)}
                        className="signup-btn login-btn">Sign Up with Email</button>
                    </form>
                    <p className="login-foot">
                        By signing up, you agree to Gwaphics' Terms of Use and Privacy
                        Policy.
                    </p>
                    <p className="login-foot">
                        Already signed up? <Link to="/login">Log in</Link>
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

export default Register;