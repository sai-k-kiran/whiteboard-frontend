import React, { useEffect } from "react";
import "./Design.css";
import useFabric from "./useFabric";
import { CanvasContext } from "../../main"
import { useSelector } from "react-redux";

const Design = () => {
  const fabricRef = useFabric();
  const canvas = React.useContext(CanvasContext);
//   const jsonData = useSelector((state) => state.design.data);

  // useEffect(() => {
  //   canvas.current.loadFromJSON(jsonData);
  // }, []);

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