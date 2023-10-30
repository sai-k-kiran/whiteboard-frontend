import React, { useState, useEffect } from "react";
import "./UserDropDown.css";
import { useSelector, useDispatch } from "react-redux";
import User from "../images/user.png";
import { setModal } from "../redux/User/UserActions";

const UserDropDown = ({ Logout }) => {
  const [animate, setAnimate] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    setAnimate(true);
  }, []);
  
  return (
    <div className={`dropdownCard ${animate ? "animate" : ""}`}>
      <ul className="list">
        <li className="profile">
          <div className="profileImg">
            <img src={User} className="user-avatar" alt="profile img" />
          </div>
          <div className="profileText">
            <p>{user.name}</p>
            <small>{user.email}</small>
          </div>
        </li>
        <li> 
          <hr className="hr" />
        </li>
        <li className="listItem" onClick={() => dispatch(setModal("show"))}>
          Update
        </li>
        <li className="listItem" onClick={() => Logout()}>
          Sign out
          </li>
      </ul>
    </div>
  );
};
 
export default UserDropDown;