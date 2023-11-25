import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addJson } from "../redux/Design/DesignActions";
import "./AllDesigns.css";
import { MdDeleteForever } from "react-icons/md";
import Paintbrush from "../Images/paintbrush.jpg"
import { useNavigate } from "react-router";

function SavedDesigns() {
  const user = useSelector((state) => state.user.currentUser);
  const [designs, setDesigns] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <>
      {designs.length > 0 ? (
          <div className="designList">
          <ul className="templates">
              {designs != 0
              ? designs.map((item, i) => {
                  return (
                    <li className="savedDesigns" key={item.designId}>
                       <img
                          src={Paintbrush}
                          className="templateImage"
                          alt={item.name}
                        />
                        <div className="more-buttons">
                          <button className="more-btn" onClick={() => draw(i)}>Edit</button>
                          <MdDeleteForever
                            className="delete-button"
                            onClick={() => deleteSaved(item.designId)}
                          />
                        </div>
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