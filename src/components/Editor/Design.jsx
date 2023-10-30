import React, { useEffect } from "react";
import "./Design.css";
import useFabric from "./useFabric";
import { CanvasContext } from "../../main"
import { useSelector } from "react-redux";

const Design = () => {
  const fabricRef = useFabric();
  const canvas = React.useContext(CanvasContext);
  const user = useSelector((state) => state.user.currentUser);
  const image = useSelector((state) => state.design.data);
  console.log(image)
  
  function createTemplate() {
    canvas.current?.add(
      new fabric.IText(user.name, {
        left: 100,
        top: 100,
        fill: "white",
      })
    );
    canvas.current?.add(
      new fabric.IText(user.phoneNum || "", {
        left: 100,
        top: 200,
        fill: "white",
      })
    );
    canvas.current?.add(
      new fabric.IText(user.companyName || "", {
        left: 100,
        top: 300,
        fill: "white",
      })
    );
    canvas.current?.add(
      new fabric.IText(user.location || "", {
        left: 100,
        top: 400,
        fill: "white",
      })
    );
    
    canvas.current.setBackgroundImage(
      image,
      function () {
        let img = canvas.current.backgroundImage;
        img.originX = "left";
        img.originY = "top";
        img.scaleX = canvas.current.getWidth() / img.width;
        img.scaleY = canvas.current.getHeight() / img.height;
        canvas.current.renderAll();
      },
      { crossOrigin: "anonymous" }
    )

    console.log(canvas)
  }

  useEffect(() => {
    createTemplate()
  }, []);

  useEffect(() => {
    window.onbeforeunload = function () {
      return "Data will be lost if you leave the page, are you sure?";
    };
  }, []);

  return (
    <>
      <canvas ref={fabricRef} width={700} height={500} />
    </>
  );
};

export default Design;