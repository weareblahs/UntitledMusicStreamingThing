import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./WebComponents/Authentication/LandingPage";
import { LoginMiddleware } from "./WebComponents/Backend/AuthMiddleware";
import Cookies from "js-cookie";
import { MainWindow } from "./WebComponents/MainApp/MainWindow";
function App() {
  return (
    <div id="root">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              Cookies.get("userToken") ? <MainWindow /> : <LandingPage />
            }
          />
          <Route path="/loginAuth" element={<LoginMiddleware />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
