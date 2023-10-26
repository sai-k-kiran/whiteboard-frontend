import React from "react";
import { FiImage, FiGrid, FiType, FiUploadCloud } from "react-icons/fi";
import "./DesignDrawer.css";

const ToolsNav = ({ changeDrawer, current, closed, animate }) => {
  const activeButton = (id) =>
    current === id && !closed ? "active btn-tools" : "btn-tools";
  return (
    <div className="toolsNav">
      <div
        className={animate ? "highlight" : "highlightClosed"}
        style={{ transform: `translate3d(0px, ${current * 72}px, 0px)` }}
      >
        <div className={`background ${closed ? "hidden" : ""}`} />
      </div>
      <nav className="buttonsNav">
        <button
          type="button"
          className={activeButton(0)}
          onClick={() => changeDrawer(0)}
        >
          <FiImage className="drawer-icon" />
          <span>Photos</span>
        </button>
        <button
          type="button"
          className={activeButton(1)}
          onClick={() => changeDrawer(1)}
        >
          <FiGrid className="drawer-icon" />
          <span>Elements</span>
        </button>
        <button
          type="button"
          className={activeButton(2)}
          onClick={() => changeDrawer(2)}
        >
          <FiType className="drawer-icon" />
          <span>Text</span>
        </button>
        <button
          type="button"
          className={activeButton(3)}
          onClick={() => changeDrawer(3)}
        >
          <FiUploadCloud className="drawer-icon" />
          <span>Uploads</span>
        </button>
      </nav>
    </div>
  );
};

export default ToolsNav;