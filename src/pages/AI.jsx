import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../css/ai.css";

export default function AI() {
  const [zoomSrc, setZoomSrc] = useState(null);

  const aiImages = import.meta.glob("../assets/Data/AI/ai_small_*.png", { eager: true });
  const aiLarge = import.meta.glob("../assets/Data/AI/ai_*.png", { eager: true });
  const avideos = import.meta.glob("../assets/Data/AIvideo/*.mp4", { eager: true });

  const openZoom = (src) => {
    setZoomSrc(src);
    document.body.style.overflow = "hidden"; // disable background scroll
  };

  const closeZoom = () => {
    setZoomSrc(null);
    document.body.style.overflow = ""; // restore scroll
  };

  return (
    <>
      <h1 className="ai-title">AI Creations</h1>
      <div className="ai-scroll-container"> 
      <div className="ai-container">  
        {/* Images */}
        {Object.values(aiImages).map((img, index) => (
          <img
            key={index}
            className="ai-small"
            src={img.default}
            alt={`AI Image ${index}`}
            onClick={() => openZoom(Object.values(aiLarge)[index].default)}
          />
        ))}

        {/* Videos */}
        {Object.values(avideos).map((vid, index) => (
          <video key={index} className="ai-video" src={vid.default} controls />
        ))}
      </div>
      </div>

      {/* Zoom Overlay (Rendered OUTSIDE App.jsx via portal) */}
      {zoomSrc &&
        ReactDOM.createPortal(
          <div className="zoom-overlay">
            <img className="zoom-img" src={zoomSrc} alt="Zoomed View" />
            <span className="zoom-close" onClick={closeZoom}>
              ×
            </span>
          </div>,
          document.body
        )}
    </>
  );
}
