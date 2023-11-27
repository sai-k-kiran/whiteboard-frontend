import React, { useEffect, useState } from "react";
import "./DesignTools.css";
import { CanvasContext } from "../../main";
import { TfiPaintBucket } from "react-icons/tfi";
import { MdFormatColorText, MdFormatBold,  } from "react-icons/md";
import { IoMdColorPalette } from "react-icons/io";
import { ImItalic, ImUnderline} from "react-icons/im";

function DesignTools() {
  const canvas = React.useContext(CanvasContext);
  const [toggle, setToggle] = useState(false);
  const [animate, setAnimate] = useState(false);

  const Delete = () => {
    const selected = canvas.current.getActiveObject();
    canvas.current?.remove(selected);
  };

  useEffect(() => {
    document.addEventListener("keydown", canvas.current.renderAll());
    setAnimate(true);
  }, []);

  const onDelete = (e) => {
    e.preventDefault();
    if (e.key === "Delete") {
      const selected = canvas.current.getActiveObject();
      canvas.current?.remove(selected);
    } else return;
  };
  const changeColor = (e) => {
    if (canvas.current.getActiveObject()) {
      canvas.current?.getActiveObject().set("fill", e.target.value);
      canvas.current.renderAll();
    }
  };
  const front = () => {
    const active = canvas.current.getActiveObject();
    canvas.current.bringToFront(active);
    canvas.current.discardActiveObject();
  };
  const back = () => {
    const active = canvas.current.getActiveObject();
    canvas.current.sendToBack(active);
    canvas.current.discardActiveObject();
  };
  const opacitySlider = (e) => {
    if (canvas.current.getActiveObject()) {
      canvas.current?.getActiveObject().set("opacity", e.target.value / 100);
      canvas.current.renderAll();
    }
  };
  const changeFont = (e) => {
    if (canvas.current.getActiveObject()) {
      if (canvas.current.getActiveObject().type === "i-text") {
        canvas.current?.getActiveObject().set("fontFamily", e.target.value);
        canvas.current.renderAll();
      }
    }
  };
  const addStroke = (e) => {
    if (canvas.current.getActiveObject()) {
      if (canvas.current.getActiveObject().type === "i-text") {
        canvas.current?.getActiveObject().set("strokeWidth", e.target.value);
        canvas.current.renderAll();
      }
    }
  };
  const strokeColor = (e) => {
    if (canvas.current.getActiveObject()) {
      if (canvas.current.getActiveObject().type === "i-text") {
        canvas.current?.getActiveObject().set("stroke", e.target.value);
        canvas.current.renderAll();
      }
    }
  };
  function backgroundTint() {
    canvas.current?.add(
      new fabric.Rect({
        height: 500,
        width: 700,
        fill: "#000000",
        opacity: 0.5, 
      })
    );
  }
  function editText(action) {
    var o = canvas.current?.getActiveObject();
    var t;
    if (o) t = o.get('type');

    if (o && t === 'i-text') {
        switch(action) {
            case 'bold':				
                var isBold = getStyle(o, 'fontWeight') === "bold";
                o.set("fontWeight", isBold ? "normal" : "bold");   
            break;

            case 'italic':
                var isItalic = getStyle(o, 'fontStyle') === 'italic';
                o.set("fontStyle", isItalic ? "normal" : "italic");
            break;

            case "underline":
                var isUnderline = getStyle(o, 'underline') == true;
                o.set("underline", isUnderline ? false : true);
            break;      
        }
        canvas.current.renderAll();
    }
}

function getStyle(object, styleName) {
    return object[styleName];
}

  return (
    <div className="designTools">
      <div className="colorNav"></div>
      <div className="deleteNav">
        <p style={{ fontSize: "16px", marginRight: "10px" }}>
          Transparency
        </p>
        <input
          className="range"
          type="range"
          name="opacity"
          defaultValue="100"
          min="0"
          step="1"
          max="100"
          onClick={opacitySlider}
        />
        <button className="front-btn" onClick={front}>
          Bring to front
        </button>
        <button className="front-btn back" onClick={back}>
          Send to back
        </button>
        <button className="text-btn" onClick={() => setToggle(!toggle)}>
            <MdFormatColorText />
        </button>
        {toggle ? 
        <div className={`textdropdownCard ${animate ? "animate" : ""}`}>
            <ul className="list">
              <li className="profile">
                  <div className="font-family">
                  <label htmlFor="font-family">Font</label>
                  <select id="font-family" onChange={changeFont}>
                      <option value="Audiowide">Audiowide</option>
                      <option value="Arial">Arial</option>
                      <option value="Bangers">Bangers</option>
                      <option value="georgia">Georgia</option>
                      <option value="courier">Courier</option>
                      <option value="comic sans ms">Comic Sans MS</option>
                      <option value="impact">Impact</option>
                      <option value="Lobster">Lobster</option>
                      <option value="myriad pro">Myriad Pro</option>
                      <option value="Monotype Corsiva">Monotype Corsiva</option>
                      <option value="Oswald">Oswald</option>
                      <option value="Pacifico">Pacifico</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Sacramento">Sacramento</option>
                      <option value="Satisfy">Satisfy</option>
                      <option value="Times">Times New Roman</option>
                      <option value="verdana">Verdana</option>
                  </select>
                  </div>
              </li>
              <li><hr className="hr"/></li>
              <li className="tools-list">
                <div className="stroke-div">
                    <p>Stroke</p>
                    <label>
                    <input
                      type="color"
                      id="fontColorButton"
                      className="color-btn"
                      style={{"display":"none"}}
                      onChange={(e) => strokeColor(e)}
                    />
                        <IoMdColorPalette  style={{"cursor":"pointer"}}/>
                    </label>
                </div>
                  <input
                    className="strokerange"
                    type="range"
                    name="stroke"
                    defaultValue="0"
                    min="0"
                    step="1"
                    max="10"
                    onClick={addStroke}
                  />
              </li>
              <li><hr className="hr"/></li>
              <li className="tools-list">
                  <div className="stroke-div">
                      <p>Font:</p>
                      <MdFormatBold onClick={() => editText("bold")} 
                          style={{"cursor": "pointer", "fontSize": "30px"}}/>
                      <ImItalic onClick={() => editText("italic")} style={{"cursor": "pointer"}}/>
                      <ImUnderline onClick={() => editText("underline")} style={{"cursor": "pointer"}}/>
                  </div>
              </li>
              <li><hr className="hr"/></li>
              <li className="tools-list">
                  <button className="uploadBtn" onClick={backgroundTint}>Add background tint</button>
              </li>
            </ul>
        </div>
          : null}
        
        <label>
        <input
          type="color"
          id="fontColorButton"
          className="color-btn"
          style={{"display":"none"}}
          onChange={(e) => changeColor(e)}
        />
        <TfiPaintBucket style={{"cursor":"pointer"}}/>
        </label>
 
        <button className="delete-btn" onClick={Delete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default DesignTools;