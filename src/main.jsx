import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { KindeData } from "./WebComponents/Backend/KindeData.jsx";
createRoot(document.getElementById("root")).render(
  <KindeProvider
    clientId={KindeData("clientID")}
    domain={KindeData("domain")}
    logoutUri={window.location.origin}
    redirectUri={window.location.origin}
  >
    <NextUIProvider>
      <StrictMode>
        <main className="dark text-foreground bg-background">
          <App />
        </main>
      </StrictMode>
    </NextUIProvider>
  </KindeProvider>
);
