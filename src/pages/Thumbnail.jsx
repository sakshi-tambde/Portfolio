import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../css/thumb.css";

export default function Thumbnail() {
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
      <h1 className="thumb-title">Thumbnails</h1>
      <div className="thumb-scroll-container"> 
      <div className="thumb-container">  
        {/* Images */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <img
            key={i}
            className="thumb-small"
            src={`/Data/Thumbnail/thumb_small_${i}.png`}
            alt={`AI Image ${i}`}
            onClick={() => openZoom(`/Data/Thumbnail/thumb_${i}.jpg`)}
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
