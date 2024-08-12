import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <StrictMode>
      <main className="dark text-foreground bg-background">
        <App />
      </main>
    </StrictMode>
  </NextUIProvider>
);
