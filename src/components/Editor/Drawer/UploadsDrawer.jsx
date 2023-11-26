import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./UnsplashDrawer.css";
import { useSelector } from "react-redux";
import { CanvasContext } from "../../../main";
import { fabric } from "fabric";

function UploadsDrawer() {
  const canvas = React.useContext(CanvasContext);
  const [images, setImages] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

  const handleFile = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("user_id", user.id);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    Axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/storage/uploadFile`,
     data, config)
      .then((res) => {
        setImages([...images, res.data.image_url]);
        console.log(images);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/storage/allImages`,
      {params:{id: user.id}}
    ).then((res) => {
      setImages(res.data);
      console.log(images);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  function handlePhotos(imageUrl) {
    fabric.Image.fromURL(imageUrl,
      function (oImg) {
        oImg.scale(0.1);
        canvas.current?.add(oImg);
        canvas.current.renderAll();
      },
      { crossOrigin: "anonymous" }
    );
  }

  return (
    <div className="uploadsContainer">
      <label htmlFor="upload-button" className="uploadBtn">
        <h2>Upload an Image</h2>
        <input
          id="upload-button"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFile}
        />
      </label>
      {!images ? (
        <div className="header">
          <h2>No uploaded images</h2>
        </div>
      ) : (
        <div className="scrollDiv">
          {images.map((image) => {
            return (
              <div
                key={image.id}
                className="unsplash-image"
                onClick={() => handlePhotos(image.imageUrl)}
              >
                <img
                  src={image.imageUrl}
                  alt="uploaded_img"
                  className="uploaded-image"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UploadsDrawer;