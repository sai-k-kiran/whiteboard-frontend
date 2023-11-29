import React, {useState, useEffect} from "react";
import Navbar from "../Home/Navbar";
import "./Login.css";
import "./Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/User/UserActions";
import { useAuth } from "../context/authContext.jsx";
import {FiUserCheck} from "react-icons/fi"
import Back from "../Images/back.jpg"

function Login() {
  const {user, login} = useAuth()
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false)
  const [invalid, setInValid] = useState(true)

  if(localStorage.getItem("token")){
    navigate('/home')
  }

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
        <img className="login-back" src={Back} />
          <div className="loginContainer">
             <div className="login-info">
                  <h1>Log in to use Whiteboard</h1>
                  <p>Increase your social presence</p>
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
                          className="login-btn sign-in"
                          onClick={() => handleSubmit(data)}>
                            Sign In</button>
                      </form>

                  <button className="social-btn login-btn" >
                    <FiUserCheck />
                    Try out whiteboard Now!
                  </button>
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