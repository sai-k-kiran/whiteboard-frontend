import React, { useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import "./Modal.css";
import Axios from "axios";
import { setCurrentUser, setModal } from "../redux/User/UserActions";
import { CgCloseO } from "react-icons/cg";
import { updateUser } from "../Services/client";
import { useNavigate } from "react-router-dom";

function Modal() {
  const [data, setData] = useState({ location: "", phoneNum: "", companyName: "" });
  const [logo, setLogo] = useState({ image: "", name: "" });
  const [error, setError] = useState(false);

  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const input = e.target.name;
    const value = e.target.value;

    setData({ ...data, [input]: value });
  };

  const handleFile = (e) => {
    setLogo({ image: e.target.files[0], name: e.target.files[0].name });
    if (e.target.files) {
      var fileName = document.getElementById("upload-button").value;
      var dot = fileName.lastIndexOf(".") + 1;
      var imgFile = fileName.substr(dot, fileName.length).toLowerCase();
      if (imgFile === "jpg" || imgFile === "jpeg" || imgFile === "png") {
        setLogo({ image: e.target.files[0], name: e.target.files[0].name });
      } else {
        setError("Only jpg/jpeg and png files are allowed");
      }
    }
  };

  const update = (data) => {
    const values = new FormData();
    // values.append("image", logo.image);
    // values.append("logo", logo.name);
    values.append("companyName", data.companyName);
    values.append("location", data.location);
    values.append("phoneNum", data.phoneNum);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
      
      updateUser(user.id, data)
      .then((response) => {
        dispatch(setCurrentUser(response.data.userDTO));
        console.log(response.data.userDTO)

        alert("Data updated");
      })
      .catch((err) => console.log(err))
      .finally(
        dispatch(setModal("hide")),
        loading()
      )
  }

  const loading = () =>{

  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="topBlock">
          <button
            className="titleCloseBtn"
            onClick={() => dispatch(setModal("hide"))}
          >
            <CgCloseO />
          </button>
          <div className="title">Update profile</div>
        </div>
        <div className="Modalbody">
          <form className="modalForm">
            <div className="input-form">
              <input
                name="location"
                type="text"
                onChange={handleChange}
                value={data.location}
                placeholder="Address"
                required
              />
              <input
                name="companyName"
                type="text"
                onChange={handleChange}
                value={data.companyName}
                placeholder="Company"
                required
              />
              <input
                name="phoneNum"
                type="text"
                onChange={handleChange}
                value={data.phoneNum}
                placeholder="Phone"
                required
              />
              <label htmlFor="upload-button" className="upload-Btn">
                <h3>Logo</h3>
                <input
                  id="upload-button"
                  name="image"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/PNG, image/JPG, image/JPEG"
                  onChange={handleFile}
                />
              </label>
              <p className={error ? "errorMessage true" : "errorMessage false"}>
                {error}
              </p>
            </div>
          </form>
        </div>
        <div className="footer">
          <button type="submit" onClick={() => update(data)}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { user: state.user.currentUser };
} 

export default connect(mapStateToProps)(Modal);
