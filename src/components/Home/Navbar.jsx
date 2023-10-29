import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logout from "../Auth/logout";
import Logo from "../Images/logo.svg"
import { addJson } from "../redux/Design/DesignActions";

function Navbar() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate()

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
                    onClick={() => createNew()}
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