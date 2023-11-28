import React, { useState, useEffect } from "react";
import Navbar from "../Home/Navbar";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/User/UserActions";
import { useAuth } from "../context/authContext.jsx";
import Back from "../Images/back.jpg"

function SignIn() {
  const {user, login} = useAuth()
  const [data, setData] = useState({ username: "", password: "" });
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
  const setEmail = (e) => {
    if(!isValidEmail(e.target.value)) {
      setError(true)
    } else {
      setError(null);
    }
    setData((data) => ({ ...data, username: e.target.value }))
  }

  useEffect(() => {
    if(data.password != "" && data.username != "" && !error) setInValid(false)
    else setInValid(true)
  }, [data.username, data.password])


  const handleSubmit = (data) => {
    login(data).then((res) => {
      navigate("/home/allDesigns")
      dispatch(setCurrentUser(res.data.userDTO))
      console.log(res)

    }).catch(err => console.log(err.response))
  };

  return (
    <>
        <Navbar />
        <div className="login">
            <img className="signin-back" src={Back} />
                <div className="loginContainer">
                    <div className="register-info">
                        <h1>Sign In</h1>
                        <form onSubmit={handleSubmit} className="signin-form">
                          <input
                            className="reg-input"
                            name="email"
                            value={data.email}
                            onChange={e => setEmail(e)}
                            placeholder="E-mail"
                          />{
                            <div className="errors">
                              {data.username.length != 0 && error ? (
                                <p>Email is invalid</p>
                              ) : ''}
                            </div>
                          }
                          <input
                            type="password"
                            className="reg-input"
                            value={data.password}
                            onChange={e => setPassword(e)}
                            name="password"
                            placeholder="password"
                          />
                          <button type="button" disabled={invalid}
                          className="signin-btn login-btn"
                          onClick={() => handleSubmit(data)}>
                            Sign In</button>
                        </form>
                        <p className="login-foot">
                          New to Whiteboard? <Link to="/register">Create an account</Link>
                        </p>
                    </div>
                </div>
        </div>

    </>
  );
}

export default SignIn;