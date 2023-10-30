import React, { useState, useEffect } from "react";
import './DesignDropDown.css'
import {BiRevision} from "react-icons/bi"

const DesignDropDown = () => {
  const [animate, setAnimate] = useState(false);
  const [keyword, setKeyword] = useState("")

  useEffect(() => {
    setAnimate(true);
  }, []);
  
  return (
    <div className={`search-box-random ${animate ? "animate" : ""}`}>
      <ul className="search-list">
        <li className="profile">
          <div className="search-box-img">
            <input value={keyword} name="name"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search images"/>
            <button>Search</button>
          </div>
          </li>
          <li>
          <div className="random-div">
            <div className="random-img-div">
                <BiRevision /> Random Images
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
 
export default DesignDropDown;