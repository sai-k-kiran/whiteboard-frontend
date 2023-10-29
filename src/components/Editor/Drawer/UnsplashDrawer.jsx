import React, { useState, useEffect, Suspense } from "react";
import "./UnsplashDrawer.css";
import "./DrawerSearch.css";
import Axios from "axios";
import { CanvasContext } from "../../../main";
import { fabric } from "fabric";
import { FiSearch } from "react-icons/fi";
import Loading from "../../Home/Loading";


const iterates = [{ a: 1 }, { b: 2 }, { c: 3 }];
const pages = [1,2,3,4,5]

function UnsplashDrawer() {
  const canvas = React.useContext(CanvasContext);
  const [images, setImages] = useState([]);
  const [keyword, setKeyword] = useState("");

  const changePage = (page) => {
    Axios.get(
      `https://api.unsplash.com/photos?page=${page}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
    ).then((response) => {
      setImages(response.data)
    });
  }

  useEffect(() => {
    Axios.get(
      `https://api.unsplash.com/photos/?client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
    ).then((response) => {
      setImages(response.data)
    });
  }, []);

  async function submitQuery() {
    if(keyword.length != 0){
      const request = await Axios.get(
        `https://api.unsplash.com/search/photos?query=${keyword}&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
      );
      setImages(request.data.results);
    }
  }

  function addPhoto(url) {
    fabric.Image.fromURL(
      url,
      function (oImg) {
        oImg.scale(0.1);
        canvas.current?.add(oImg);
        canvas.current.renderAll();
      },
      { crossOrigin: "anonymous" }
    );
  }

  return (
    <>
      <div className="searchBar">
        <form>
          <div className="searchInput">
            <div className="inputIcon">
              <input
                className="input-search"
                type="text"
                placeholder="Search photos"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <FiSearch onClick={submitQuery} style={{ cursor: "pointer" }} />
            </div>
          </div>
        </form>
      </div>
      <div className="customScroll">
        <div className="unsplashDrawer">
          {images.length !== 0
            ? images.map((image) => {
                return (
                  <div
                    key={image.id}
                    className="unsplash-image"
                    onClick={() => addPhoto(image.urls.regular)}
                  >
                    <img src={image.urls.thumb} alt="photos" />
                  </div>
                );
              })
            : iterates.map((item) => <Loading />)}
        </div>
      </div>
      <div className="pagination">
          {keyword.length == 0 && pages.map((id, page) => {
              return (
                <button className="pageButton" key={id} onClick={() => changePage(page)}>
                  {page}
                </button>
              )            
          })}
        </div>
    </>
  );
}

export default UnsplashDrawer;