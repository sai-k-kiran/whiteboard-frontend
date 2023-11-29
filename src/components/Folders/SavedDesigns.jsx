import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addJson } from "../redux/Design/DesignActions";
import "./AllDesigns.css";
import { MdDeleteForever } from "react-icons/md";
import Paintbrush from "../Images/paintbrush.jpg"
import { useNavigate } from "react-router";
import { FiMoreHorizontal } from "react-icons/fi";

function SavedDesigns() {
  const user = useSelector((state) => state.user.currentUser);
  const [designs, setDesigns] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  const draw = (id) => {
    var obj = designs[id]
    obj.saved = true;
    dispatch(addJson(obj));
    navigate("/editor")
  };

  async function Designs(user) {
    try{
      return await Axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/designs`, 
      {params:{id: user.id}}
      )
      .then((response) => {
          setDesigns(response.data);
        })
    }
    catch(err){
      (console.log("err: ", err))
    }
  }

  useEffect(() => {
    Designs(user)
    setAnimate(true);
  }, [])

  const deleteSaved = async (id) => {
    try{
      return await Axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/designs`,
      {params:{id: id}}
      )
      .then((response) => {
          setDesigns(response.data);
        })
    }
    catch(err){
      (console.log("err: ", err))
    }
  }

  const [clickedIndex, setClickedIndex] = useState({});

  const handleClick = (index) => () => {
    setClickedIndex(state => ({
      ...state, 
      [index]: !state[index] 
    }));
  };

  return (
    <>
      {designs.length > 0 ? (
          <div className="designList">
          <ul className="templates">
              {designs != 0
              ? designs.map((item, i) => {
                  return (
                    <li className="savedDesigns" key={item.designId}>
                      <div className="more-buttons">
                          <FiMoreHorizontal
                            className="delete-button"
                            // style={{opacity : entered ? 1 : 0}}
                            onClick={handleClick(i)}
                          />
                          {clickedIndex[i] ? 
                            <div className="edit-btn">
                              <div className={`edit-box-random ${animate ? "animate" : ""}`}>
                                <ul className="search-list">
                                  <li className="listItem"
                                  onClick={() => draw(i)}>
                                      Edit
                                    </li>
                                    <li className="listItem"
                                    onClick={() => deleteSaved(image.image_url, image.id)}>
                                      Delete
                                    </li>
                                </ul>
                              </div>
                            </div>
                          : null}
                        </div>
                       <img
                          src={Paintbrush}
                          className="templateImage"
                          alt={item.name}
                        />
                    
                    </li>
                  );
                })
              : 
              pages.map((id) => <Loading key={id} />)}
            </ul>
      </div>
      ) : (
        <div className="headers">
          <h1>No saved templates</h1>
        </div>
      )}
    </>
  );
}

export default SavedDesigns;