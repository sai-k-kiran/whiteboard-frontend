import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Home.css";
import { FiGrid, FiUploadCloud, FiFolder } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";
import Modal from "../Auth/Modal";
import { useSelector, useDispatch, connect } from "react-redux";
import { setModal } from "../redux/User/UserActions";

const Items = [
  { id: 1, name: "All Designs", icon: <FiGrid />, link: "/home/allDesigns" },
  { id: 2, name: "Saved", icon: <FiFolder />, link: "/home/saved" },
  { id: 3, name: "Uploads", icon: <FiUploadCloud />, link: "/home/uploads" },
];

function Home(){
  const [hover, setHover] = React.useState("");
  const user = useSelector((state) => state.user.currentUser);
  const show = useSelector((state) => state.user.modal);
  const dispatch = useDispatch();

  function ModalOp() {
    if (user.companyName == null || user.companyName.length == 0) {
      dispatch(setModal("show"));
    } else {
      dispatch(setModal("hide"));
    }
  }

  useEffect(() => {
    const timer = setTimeout(ModalOp, 3000);
    return () => {
      clearTimeout(timer);
    }
  }, []);

  return (
    <div>
      {show === "show" ? <Modal /> : null}
      <Navbar />
      <div className="home-tab">
        <div className="home-side-bar">
          <ul className="side-bar-links">
            {Items.map((item) => {
              const { id, name, icon, link } = item;
              return (
                <Link to={link} key={item.id}>
                  <li
                    onMouseEnter={() => setHover(id)}
                    onMouseLeave={() => setHover("")}
                    className={
                      hover === id
                        ? `active-route${id} side-bar-link`
                        : "side-bar-link"
                    }
                  >
                    {icon}
                    <p>{name}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="routeContainer">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { user: state.user.currentUser };
} 

export default connect(mapStateToProps)(Home);