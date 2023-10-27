import React, { useEffect, useState } from "react";
import "./TextDrawer.css";
import "./ElementsDrawer.css";
import { CanvasContext } from "../../../main";
import { fabric } from "fabric";

function TextDrawer() {
  const canvas = React.useContext(CanvasContext);

  function addHeading() {
    const Heading = new fabric.IText("Add a heading", {
      width: 300,
      top: 0,
      left: 100,
      fontFamily: "arial black",
      fontSize: 50,
      editable: true
    });
    canvas.current?.add(Heading);
  }
  function addSubtext() {
    const SubText = new fabric.IText("Add a sub-heading", {
      top: 0,
      left: 100,
      fontSize: 30,
      editable: true
    });
    canvas.current?.add(SubText);
  }
  function addLittleText() {
    const LittleText = new fabric.IText("Add a little of body text", {
      top: 0,
      left: 100,
      fontSize: 20,
      editable: true
    });
    canvas.current?.add(LittleText);
  }
  return (
    <>
      <div className="customScroll">
        <div className="textDrawer">
          <h3>Click to add text</h3>
          <div className="highlights">
            <div className="highlightItem heading" onClick={addHeading}>
              <p>Add a heading</p>
            </div>
            <div className="highlightItem subheading" onClick={addSubtext}>
              <p>Add a sub-heading</p>
            </div>
            <div className="highlightItem body" onClick={addLittleText}>
              <p>Add a little of body text</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TextDrawer;