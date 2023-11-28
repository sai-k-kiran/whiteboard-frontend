import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiSave, FiShare2, FiDownload } from "react-icons/fi";
import "./Editornav.css";
import { useNavigate } from "react-router";
import { CanvasContext } from "../../main";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../Auth/Modal";

function EditorNav() {
  const user = useSelector((state) => state.user.currentUser);
  const show = useSelector((state) => state.user.modal);

  const canvas = React.useContext(CanvasContext);
  const navigate = useNavigate();

  // const design = {};

  const download = () => {
    const url = canvas.current.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    link.download = "image.jpeg";
    link.href = url;
    link.click();
  };   

  // async function transform(){
  //   const data = canvas.current.toJSON();
  //   const obj = JSON.stringify(data);

  //   design.canvas = obj;
  //   design.user
  // } 

  const saveDesign = async() => {
    const data = canvas.current.toJSON();
    const obj = JSON.stringify(data);

    try{
      return await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/designs/editor`,
          {design: obj, user_id: user.id}
      )
      .then(alert("design has been saved"))
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="editorNav">
      {show === "show" ? <Modal /> : null}
      <nav className="leftNav">
        <div>
          <button
            type="button"
            className="btn-icon btn-editor"
            onClick={() => {
              navigate("/home/allDesigns");
            }}
          >
            <FiChevronLeft />
            Home
          </button>
        </div>
      </nav>
      <nav className="rightNav">
        <button type="button" className="btn-icon btn-editor" onClick={saveDesign}>
          <FiSave />
          <span className="ml-4">Save</span>
        </button>
        <button
          type="button"
          className="btn-icon btn-editor"
          onClick={download}
          download="image.jpg"
        >
          <FiDownload />
          <span className="ml-4">Download</span>
        </button>
        
      </nav>
    </div>
  );
}

export default EditorNav;