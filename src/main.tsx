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

// Force open in default browser
const enforceRedirect = () => {
  if (isInAppBrowser()) {
    const url = window.location.href;
    setTimeout(() => {
      const newTab = window.open(url, "_blank"); // Open in a new tab (default browser)
      if (newTab) {
        window.close(); // Close in-app browser (if allowed)
      } else {
        window.location.href = url; // Fallback if window.close() is blocked
      }
    }, 500);
  }
};

enforceRedirect(); // Call the function

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
