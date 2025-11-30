import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../css/poster.css";

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
      <h1 className="poster-title">Posters</h1>
      <div className="poster-scroll-container"> 
      <div className="poster-container">  
        {/* Images */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <img
            key={i}
            className="poster-small"
            src={`/Data/Posters/poster_small_${i}.png`}
            alt={`AI Image ${i}`}
            onClick={() => openZoom(`/Data/Posters/poster_${i}.png`)}
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
