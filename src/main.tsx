import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster richColors position="top-right" />
  </StrictMode>
);
