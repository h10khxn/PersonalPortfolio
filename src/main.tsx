import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Function to detect in-app browsers
const isInAppBrowser = (): boolean => {
  const ua = navigator.userAgent || navigator.vendor;
  return (
    /FBAN|FBAV|Instagram|LinkedIn|Twitter/i.test(ua) &&
    /Mobile|Android|iPhone|iPad/i.test(ua)
  );
};

const RedirectPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isInAppBrowser()) {
      setShowPopup(true);
    }
  }, []);

  const handleRedirect = () => {
    const url = window.location.href;
    window.open(url, "_blank");
  };

  if (!showPopup) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        zIndex: 9999,
        textAlign: "center",
        padding: "20px",
      }}
    >
      <p style={{ fontSize: "18px", marginBottom: "20px" }}>
        ⚠️ You're using an in-app browser.  
        For the best experience, please open this page in your default browser.
      </p>
      <button
        onClick={handleRedirect}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          color: "white",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Open in Browser
      </button>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RedirectPopup />
    <App />
  </BrowserRouter>
);
