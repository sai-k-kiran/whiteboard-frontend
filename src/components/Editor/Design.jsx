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
  console.log(user)
  
  function createTemplate() {
    canvas.current?.add(
      new fabric.IText(user.name, {
        left: 200,
        top: 30,
        fill: "black",
        zIndex: 99
      })
    );
    canvas.current?.add(
      new fabric.IText(user.phoneNum || "", {
        left: 200,
        top: 100,
        fill: "black",
      })
    );
    canvas.current?.add(
      new fabric.IText(user.companyName || "", {
        left: 200,
        top: 170,
        fill: "black",
      })
    );
    canvas.current?.add(
      new fabric.IText(user.location || "", {
        left: 200,
        top: 240,
        fill: "black",
      })
    );
    
    if(image.length != 0 && image != null){
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
    }
  }

  useEffect(() => {
    createTemplate()
  }, [image])

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