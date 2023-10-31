import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addJson } from "../redux/Design/DesignActions";
import "./AllDesigns.css";
import { MdDeleteForever } from "react-icons/md";

function SavedDesigns() {
  const user = useSelector((state) => state.user.currentUser);
  const [designs, setDesigns] = useState([]);
  const dispatch = useDispatch();

  const draw = (design) => {
    // const data = JSON.parse(design.data);
    // setTimeout(dispatch(addJson(data)), 1000);
  };

  async function Designs(user) {
    try{
      return await Axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/designs`, 
      user
      )
      .then((response) => {
          setDesigns(response.data.designDTO);
          console("success: ", response.data.designDTO)
        })
    }
    catch(err){
      (console.log("err: ", err))
    }
    
  }

  useEffect(() => {
    Designs(user)
  }, [])

  const deleteSaved = (id) => {
    // Axios.post(
    //   "https://localhost:3001/saved/delete_saved",
    //   { id: id },
    //   { withCredentials: true }
    // )
    //   .then((response) => {
    //     setDesigns(designs.filter((item) => item.id !== id));
    //   })
    //   .catch((err) => console.log("error"));
  };

  return (
    <>
      {designs.length > 0 ? (
        <div className="savedDesigns">
          {designs.map((design) => (
            <div
              className="savedDesign"
              key={design.id}
              // onClick={() => draw(design)}
            >
              <Link to="/editor" style={{ color: "black" }}>
                <h3>
                  Design: {design.id}
                </h3>
              </Link>
              <MdDeleteForever
                className="delete-button"
                onClick={() => deleteSaved(design.id)}
              />
            </div>
          ))}
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