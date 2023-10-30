import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/User/UserActions";
import UserDropDown from "../Home/UserDropDown.jsx";
import { useNavigate } from "react-router";
import {CiUser} from "react-icons/ci";
import  {connect}  from "react-redux";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggleDrop, setToggleDrop] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    dispatch(setCurrentUser(null));
  };
  return (
    <>
      <div className="user-icon">
        <button className="drop-btn" onClick={() => setToggleDrop(!toggleDrop)}>
          <CiUser style={{fontSize: "30px"}}/>
        </button>
        {toggleDrop ? <UserDropDown Logout={logout} /> : null}
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return { user: state.user.currentUser };
} 

export default connect(mapStateToProps)(Logout);