import React, { useState, useEffect } from "react";
import "./AllDesigns.css";
import { useNavigate } from "react-router";
import { CanvasContext } from "../../main";
import { fabric } from "fabric";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addJson } from "../redux/Design/DesignActions";
import Axios from "axios";
import Loading from "../Home/Loading";
import {ImSearch} from "react-icons/im"

const pages = [1,2,3,4,5,6]

function AllDesignsContainer() {
  const [templates, setTemplates] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const [toggleDrop, setToggleDrop] = useState(false);

  function draw(image) {
    dispatch(addJson(image))
    navigate("/editor")
  }

  async function submitQuery() {
    if(keyword.length != 0){
      const request = await Axios.get(
        `https://api.unsplash.com/search/photos?query=${keyword}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
      );
      setTemplates(request.data.results);
    }
  }

  const [animate, setAnimate] = useState(false);
  const [keyword, setKeyword] = useState("")

  useEffect(() => {
    setAnimate(true);
  }, []);


  return (
    <>
      <div className="template-container">
        <div className="random-img">
            <ImSearch onClick={() => setToggleDrop(!toggleDrop)}/>
        </div>
        {toggleDrop ? 
             <div className={`search-box-random ${animate ? "animate" : ""}`}>
               <ul className="search-list">
                 <li className="profile">
                   <div className="search-box-img">
                     <input value={keyword} name="name"
                     onChange={(e) => setKeyword(e.target.value)}
                     placeholder="Search images"/>
                     <button onClick={submitQuery}>Search</button>
                   </div>
                   </li>
               </ul>
             </div>
           : null}
        <div className="designList">
            <ul className="templates">
                {templates != 0
                ? templates.map((item) => {
                    return (
                      <li className="savedDesigns" key={item.id}>
                        <Link to="/editor" style={{ color: "black" }}>
                          <img
                            src={item.urls.small}
                            className="templateImage"
                            alt={item.name}
                            onClick={() => draw(item.urls.regular)}
                          />
                        </Link>
                      </li>
                    );
                  })
                : 
                pages.map((page, id) => <Loading key={id} />)}
              </ul>
        </div>
      </div>
    </>
  );
}

export default AllDesignsContainer;