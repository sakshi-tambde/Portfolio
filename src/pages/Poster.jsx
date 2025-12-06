import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../css/poster.css";

export default function Thumbnail() {
  const [zoomSrc, setZoomSrc] = useState(null);

  const posImages = import.meta.glob("../assets/Data/Posters/poster_small_*.png", { eager: true });
  const posLarge = import.meta.glob("../assets/Data/Posters/poster_*.png", { eager: true });


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
      <h1 className="poster-title">Posters</h1>
      <div className="poster-scroll-container"> 
      <div className="poster-container">  
        {/* Images */}
        {Object.values(posImages).map((img, index) => (
          <img
            key={index}
            className="poster-small"
            src={img.default}
            alt={`Poster Image ${index}`}
            onClick={() => openZoom(Object.values(posLarge)[index].default)}
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
