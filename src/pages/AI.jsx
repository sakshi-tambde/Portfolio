import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../css/ai.css";

export default function AI() {
  const [zoomSrc, setZoomSrc] = useState(null);

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
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <img
            key={i}
            className="ai-small"
            src={`../assets/Data/AI/ai_small_${i}.png`}
            alt={`AI Image ${i}`}
            onClick={() => openZoom(`../assets/Data/AI/ai_${i}.png`)}
          />
        ))}

        {/* Videos */}
        {[1].map((i) => (
          <video
            key={`vid-${i}`}
            className="ai-video"
            src={`../assets/Data/AIvideo/ai_vid_${i}.mp4`}
            controls
          />
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
