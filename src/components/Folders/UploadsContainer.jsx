import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import "./AllDesigns.css";
import { MdDeleteForever } from "react-icons/md";

function UploadsContainer() {
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

  function fetchUploads() {
    Axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/storage/allImages`,
      {params:{id: user.id}}
    ).then((res) => {
      setImages(res.data);
    })
    .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchUploads();
  }, []);

  const deleteUploaded = async (url, id) => {
    await Axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/storage/deleteFile`,
      {params:{fileUrl: url}}
    )
      .then((response) => {
        setImages(images.filter((item) => item.id !== id));
        console.log("Item deleted")
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {images.length > 0 ? (
        <ul className="templates">
          {images.map((image) => {
            return (
              <li className="savedDesigns" key={image.id}>
                <img
                  src={image.image_url}
                  alt="uploaded_img"
                  className="uploads-image"
                />
                 <div className="more-buttons">
                      <MdDeleteForever
                        className="delete-button"
                        onClick={() => deleteUploaded(image.image_url, image.id)}
                      />
                </div>
                {/* <MdDeleteForever
                  className="delete-button"
                  onClick={() => deleteUploaded(image.image_url, image.id)}
                /> */}
              </li>
             
            );
          })}
        </ul>
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