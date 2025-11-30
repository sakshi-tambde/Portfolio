import { useEffect, useRef, useCallback } from "react";
import Layout from "./Layout";
import "../css/star.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MySelf from "../pages/MySelf";
import AI from "../pages/AI";
import Thumbnail from "../pages/Thumbnail";
import Poster from "../pages/Poster";
import AboutPage from "../pages/AboutPage";
import Credit from "../pages/Credit";
import { generateStars, spawnShootingStar } from "../utils/starEngine";
import starSky from "../assets/starry-sky-241647.mp3";
import clink from "../assets/wine-glass-clink-36036.mp3";

/* ────────────────────────────────────────────────────────────────
   Web Audio Setup (Global)
───────────────────────────────────────────────────────────────── */

let audioCtx = null;
let clickBuffer = null;

async function loadClickSound() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const resp = await fetch(clink);
  const arrayBuffer = await resp.arrayBuffer();
  clickBuffer = await audioCtx.decodeAudioData(arrayBuffer);
}

function playClickSound() {
  if (!audioCtx || !clickBuffer) return;

  const source = audioCtx.createBufferSource();
  source.buffer = clickBuffer;

  const gain = audioCtx.createGain();
  gain.gain.value = 0.33;

  source.connect(gain).connect(audioCtx.destination);
  source.start(0);
}

/* ────────────────────────────────────────────────────────────────
   Router
───────────────────────────────────────────────────────────────── */

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MySelf /> },
      { path: "about", element: <AboutPage /> },
      { path: "ai", element: <AI /> },
      { path: "thumb", element: <Thumbnail /> },
      { path: "poster", element: <Poster /> },
      { path: "credit", element: <Credit />},
    ],
  },
], {basename: "/Portfolio"}
);

/* ────────────────────────────────────────────────────────────────
   Main App Component
───────────────────────────────────────────────────────────────── */

export default function App() {
  const containerRef = useRef(null);
  const bgMusicRef = useRef(null);
  const timer = useRef(null);

  /* ─────────────────────────────────────────────────────
     Background music + shooting stars
  ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const bg = bgMusicRef.current;
    if (!bg) return;
    bg.volume = 1;

    const playOnFirstClick = () => bg.play().catch(() => {});
    document.addEventListener("click", playOnFirstClick, { once: true });

    const visibility = () => {
      if (document.hidden) {
        bg.pause();
        clearTimeout(timer.current);
      } else {
        bg.play().catch(() => {});
        scheduleShooting();
      }
    };

    document.addEventListener("visibilitychange", visibility);
    scheduleShooting();

    return () => {
      document.removeEventListener("visibilitychange", visibility);
      clearTimeout(timer.current);
    };
  }, []);

  const scheduleShooting = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      spawnShootingStar(containerRef.current);
      scheduleShooting();
    }, Math.random() * 1000 + 3000);
  }, []);

  /* ─────────────────────────────────────────────────────
     Starfield + resize
  ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    generateStars(container);

    let resizeTimer = null;
    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        generateStars(container);
        spawnShootingStar(container);
      }, 250);
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      container.innerHTML = "";
    };
  }, []);

  /* ─────────────────────────────────────────────────────
     WebAudio: preload click sound + handle menu clicks
  ─────────────────────────────────────────────────────── */
  useEffect(() => {
    loadClickSound(); // preload instantly

    const handler = (e) => {
      if (e.target.tagName === "A") {
        playClickSound();
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  /* ─────────────────────────────────────────────────────
     Render
  ─────────────────────────────────────────────────────── */
  return (
    <>
      <div ref={containerRef} className="stars-container" />
      <audio ref={bgMusicRef} src={starSky} loop />
      <RouterProvider router={router} />
    </>
  );
}
