import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import "./AllDesigns.css";
import { MdDeleteForever } from "react-icons/md";

function UploadsContainer() {
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

  function fetchUploads() {
    Axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/storage/allImages`,
      {params:{id: user.id}}
    ).then((res) => {
      setImages(res.data.image_url);
      console.log(res); 
    })
    .catch(err => {
      console.log(err)
    })
  }

  // useEffect(() => {
  //   fetchUploads();
  // }, []);

  const deleteUploaded = (url, id) => {
    Axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/storage/deleteFile`,
      { withCredentials: true }
    )
      .then((response) => {
        setImages(images.filter((item) => item.id !== id));
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {images.length > 0 ? (
        <div className="uploaded">
          {images.map((image) => {
            return (
              <div className="uploads-div">
                <img
                  key={image.id}
                  src={image.imageUrl}
                  alt="uploaded_img"
                  className="uploads-image"
                />
                <MdDeleteForever
                  className="delete-button"
                  onClick={() => deleteUploaded(image.imageUrl, image.id)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="headers">
            <h1>No uploaded images</h1>
          </div>
        </>
      )}
    </>
  );
}

export default UploadsContainer;