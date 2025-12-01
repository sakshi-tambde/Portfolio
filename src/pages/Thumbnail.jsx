import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../css/thumb.css";

export default function Thumbnail() {
  const [zoomSrc, setZoomSrc] = useState(null);

  const thumbImages = import.meta.glob("../assets/Data/Thumbnail/thumb_small_*.png", { eager: true });
  const thumbLarge = import.meta.glob("../assets/Data/Thumbnail/thumb_*.png", { eager: true });

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
        {Object.values(thumbImages).map((img, index) => (
          <img
            key={index}
            className="thumb-small"
            src={img.default}
            alt={`Thumb Image ${index}`}
            onClick={() => openZoom(Object.values(thumbLarge)[index].default)}
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
