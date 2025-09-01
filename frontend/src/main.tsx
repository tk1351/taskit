import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const renderApp = () => {
  const rootElement = document.getElementById("root");

  if (!rootElement) return null;

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

renderApp();
