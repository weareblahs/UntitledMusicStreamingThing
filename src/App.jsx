import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./WebComponents/Authentication/LandingPage";
import { LoginMiddleware } from "./WebComponents/Backend/AuthMiddleware";
import Cookies from "js-cookie";
import { MainWindow } from "./WebComponents/MainApp/MainWindow";
import { UploadTracks } from "./WebComponents/DistDash/UploadTracks";
import { MoreInformation } from "./WebComponents/DistDash/MoreInformation";
import { AddTrack } from "./WebComponents/DistDash/AddTrack";
function App() {
  let date = Date.now();
  return (
    <div id="root">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              Cookies.get("userToken") ? (
                Cookies.get("tokenExpiry") <
                parseInt(String(date).substring(0, 10)) ? (
                  <LandingPage />
                ) : (
                  // Cookies.remove("userToken")
                  <MainWindow />
                )
              ) : (
                <LandingPage />
              )
            }
          />
          <Route path="/loginAuth" element={<LoginMiddleware />} />
          {/* Distribution Dashboard */}
          <Route
            path="/DistDashEndpoint/uploadTracks"
            element={<UploadTracks />}
          />
          <Route
            path="/DistDashEndpoint/finalizeUpload"
            element={<MoreInformation />}
          />
          <Route path="/DistDashEndpoint/addTrack" element={<AddTrack />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
