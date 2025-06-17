import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from '../pages/SignupPage';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage  />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Redirect any unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
