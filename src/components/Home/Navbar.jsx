import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logout from "../Auth/logout";
import Logo from "../Images/capture.png"
import { addJson } from "../redux/Design/DesignActions";
import { useAuth } from "../context/authContext.jsx";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  function setZero() {
    dispatch(addJson(""));
  }

  function createNew() {
    navigate("/editor");
    dispatch(addJson(""));
    setTimeout(addTemplate, 1000);
  }

  return (
    <div className="navbar">
      <nav>
        <img className="logo" src={Logo} alt="logo" />
        <div>
          <ul className="navlinks">
            {user ? (
              <li className="login-user">
                <h3 style={{ color: "black" }}>
                  Welcome {user.name}
                </h3>
              </li>
            ) : null}
            {user ? (
              <li>
                <Link to="/editor">
                  <button
                    className="create-design"
                    onClick={setZero}
                    // onClick={()=>setToggle(!toggle)}
                  >
                    Create design
                  </button>
                </Link>
              </li>
            ) : null}
            {user ? (
              <li className="logout-btn">
                <Logout />
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;