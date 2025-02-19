import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// Function to detect in-app browsers
const isInAppBrowser = (): boolean => {
  const ua = navigator.userAgent || navigator.vendor;
  return (
    /FBAN|FBAV|Instagram|LinkedIn|Twitter/i.test(ua) && // Detect social media in-app browsers
    /Mobile|Android|iPhone|iPad/i.test(ua) // Ensure it's a mobile device
  );
};

// Force redirect if in an in-app browser
const enforceRedirect = () => {
  if (isInAppBrowser()) {
    const url = window.location.href;
    setTimeout(() => {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
        url
      )}`;
    }, 500);
  }
};

enforceRedirect(); // Call the function

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
