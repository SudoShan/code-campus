import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from '../pages/SignupPage';
import { } from "framer-motion/client";
import LandingPage from "../pages/LandingPage";
import RoomPage from "../pages/RoomPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage  />} />
        <Route path="/Login" element={<LoginPage  />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/Dashboard/Room" element={<RoomPage />} />

        {/* Redirect any unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
