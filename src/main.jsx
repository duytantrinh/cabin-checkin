import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
      // replace current url thanh homepage
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

/* ======== dùng React Error Boundaries để bắt ac1c lỗi có thể thể xảy ra khi Reander
1. npm i react-error-boundary
2 . wrap bên ngoài App tại trang main.js để tác dụng lên tao2n bộ App

*/
