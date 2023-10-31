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
import {BiRevision} from "react-icons/bi"

const pages = [1,2,3,4,5,6]

function AllDesignsContainer() {
  const [templates, setTemplates] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const canvas = React.useContext(CanvasContext);
  const navigate = useNavigate();

  const [toggleDrop, setToggleDrop] = useState(false);

  function draw(image) {
    dispatch(addJson(image))
    navigate("/editor")
  }

  const drawFromSaved = (template) => {
    const data = JSON.parse(template.data);
    
    data.objects[0].text = user.name;
    data.objects[1].text = user.phoneNum || "";
    data.objects[2].text = user.companyName || "";
    data.objects[3].text = user.location || "";

    setTimeout(dispatch(addJson(data)), 1000);
  };

  async function Templates() {
    // await Axios.post("https://localhost:3001/templates/all_templates", {
    //   withCredentials: true,
    // })
    //   .then((response) => {
    //     if (response) {
    //       setTemplates(response.data.template);
    //     }
    //   })
    //   .catch((err) => console.log(err));
  }
  
  // useEffect(() => {
  //   Axios.get(
  //     `https://api.unsplash.com/photos/?client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
  //   ).then((response) => {
  //     setTemplates(response.data)
  //   });
  // }, []);

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
                            src={item.urls.thumb}
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