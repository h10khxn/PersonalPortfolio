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
    /FBAN|FBAV|Instagram|LinkedIn|Twitter|Snapchat/i.test(ua) &&
    /Mobile|Android|iPhone|iPad/i.test(ua)
  );
};

// Automatically copy the URL to clipboard
const copyToClipboard = () => {
  navigator.clipboard.writeText(window.location.href);
};

const RedirectPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isInAppBrowser()) {
      setShowPopup(true);
      copyToClipboard(); // Auto-copy URL
    }
  }, []);

  if (!showPopup) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
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
      <p style={{ fontSize: "18px", marginBottom: "20px", fontWeight: "bold" }}>
        ⚠️ You're using an in-app browser.
      </p>
      <p style={{ fontSize: "16px", marginBottom: "20px" }}>
        📋 **The link has been copied!** Paste it into **Chrome** or **Safari** for the best experience.
      </p>
      <p style={{ fontSize: "14px", opacity: 0.8, lineHeight: "1.5" }}>
        **To open in your browser:**  
        🔹 Tap the **three dots** in the top-right corner  
        🔹 Select **"Open in Browser"**  
      </p>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RedirectPopup />
    <App />
  </BrowserRouter>
);
