import React, { useEffect } from "react";
import "./Design.css";
import useFabric from "./useFabric";
import { CanvasContext } from "../../main"
import { useSelector } from "react-redux";

const Design = () => {
  const fabricRef = useFabric();
  const canvas = React.useContext(CanvasContext);

  const user = useSelector((state) => state.user.currentUser);
  const design = useSelector((state) => state.design.data);  // design = obj, design.design = string
  const savedDesign = design.saved;

  const createCanvas = (savedDesign) => {
    if(savedDesign) drawFromSaved(design.design);
    else createTemplate();
  }
  
  const drawFromSaved = (canvas_data) => {
    const data = JSON.parse(canvas_data);
    
    canvas.current.loadFromJSON(data, canvas.current.renderAll());
  };
  
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

    if(design.length != 0 && design != null){
      console.log(design)

      fabric.Image.fromURL(design,
        function (img) {
          let maxHeight = 500, maxWidth = 700;

          let widthAspectRatio = maxWidth / img.width;
          let heightAspectRatio = maxHeight / img.height;

          let finalScale = Math.min(widthAspectRatio, heightAspectRatio)
          
          let finalHeight = img.height * finalScale;
          let finalWidth = img.width * finalScale;

          let imgTop = 0;
          if (maxHeight > finalHeight) {
            imgTop = (Math.round(maxHeight) - Math.round(finalHeight)) / 2;
          }
      
          let imgLeft = 0;
          if (maxWidth > finalWidth) {
            imgLeft = (Math.round(maxWidth) - Math.round(finalWidth)) / 2;
          }

          img.set({ left: imgLeft, top: imgTop });
          img.scale(finalScale);

          canvas.current?.add(img);
          canvas.current.renderAll();
        },
        { crossOrigin: "anonymous" }
      )
    }
  }

  useEffect(() => {
    createCanvas(savedDesign)
  }, [design])

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