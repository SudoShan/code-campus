import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from '../pages/SignUpPage';
import { } from "framer-motion/client";
import LandingPage from "../pages/LandingPage";
import AssignmentPage from "../pages/AssignmentPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage  />} />
        <Route path="/login" element={<LoginPage  />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/AssignmentPage" element={<AssignmentPage />} />
        

        {/* Redirect any unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
