import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import "./AllDesigns.css";
import { FiMoreHorizontal } from "react-icons/fi";

function UploadsContainer() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
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
    .finally(setLoading(false));
  }

  useEffect(() => {
    fetchUploads();
    setAnimate(true);
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

  const [clickedIndex, setClickedIndex] = useState({});

  const handleClick = (index) => () => {
    setClickedIndex(state => ({
      ...state, 
      [index]: !state[index] 
    }));
  };
  return (
    <>
      {images.length > 0 ? (
        <ul className="templates">
          {images.map((image, i) => {
            return (
              <li className="savedDesigns" key={image.id}>
                <div className="more-buttons">
                      <FiMoreHorizontal
                        className="delete-button"
                       onClick={handleClick(i)}
                      />
                </div>
                {clickedIndex[i] ? 
                            <div className="edit-btn">
                              <div className={`edit-box-random ${animate ? "animate" : ""}`}
                              style={{right:"10px"}}>
                                <ul className="search-list">
                                    <li className="listItem"
                                    onClick={() => deleteUploaded(image.image_url, image.id)}>
                                      Delete
                                    </li>
                                </ul>
                              </div>
                            </div>
                          : null}
                <img
                  src={image.image_url}
                  alt="uploaded_img"
                  className="uploads-image"
                  style={{display: loading ? "none":"block"}}
                />
                <div className="loader" style={{
                    display: loading? "block" : "none",
                }} ></div>
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