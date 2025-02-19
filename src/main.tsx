import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const isInAppBrowser = (): boolean => {
  const ua = navigator.userAgent || navigator.vendor;
  return (
    /FBAN|FBAV|Instagram|LinkedIn|Twitter/i.test(ua) &&
    /Mobile|Android|iPhone|iPad/i.test(ua)
  );
};

const enforceRedirect = () => {
  if (isInAppBrowser()) {
    const url = window.location.href;

    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    
    setTimeout(() => {
      alert("Please open this link in your default browser for the best experience.");
    }, 1000);
  }
};

enforceRedirect(); 

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
