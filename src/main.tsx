import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ default import
import "./index.css"; // your global styles

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
