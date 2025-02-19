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
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark background overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          color: "#333",
          padding: "20px",
          borderRadius: "12px",
          maxWidth: "90%",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
          ⚠️ Open in Browser for Best Experience!
        </h2>
        <p style={{ fontSize: "16px", marginBottom: "15px" }}>
          📋 **The link has been copied!** Paste it into **Chrome** or **Safari**.
        </p>
        <div
          style={{
            textAlign: "left",
            fontSize: "15px",
            lineHeight: "1.6",
            fontWeight: "bold",
            backgroundColor: "#f8f9fa",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          ✅ **How to open in your browser:**  
          🔹 **Tap the three dots (•••) in the top-right corner**  
          🔹 Select **"Open in Browser"** 📤  
        </div>
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RedirectPopup />
    <App />
  </BrowserRouter>
);
