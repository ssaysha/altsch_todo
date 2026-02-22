import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App"; 
import ErrorBoundary from "./components/ErrorBoundary";
import AppRoutes from "./routes/AppRoutes";
import Providers from "./Providers"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Providers>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </Providers>
  </React.StrictMode>
);