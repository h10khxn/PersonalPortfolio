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

// Force open in default browser
const enforceRedirect = () => {
  if (isInAppBrowser()) {
    const url = window.location.href;

    if (/Android/i.test(navigator.userAgent)) {
      // Android: Use intent:// to open in the default browser
      window.location.href = `intent://${url.replace(
        /^https?:\/\//,
        ""
      )}#Intent;scheme=https;package=com.android.chrome;end;`;
    } else if (/iPhone|iPad/i.test(navigator.userAgent)) {
      // iOS: Open in Safari
      window.location.replace(url);
    }
  }
};

enforceRedirect(); // Call the function

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
