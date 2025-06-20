import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignUpPage from '../pages/SignUpPage';
import { } from "framer-motion/client";
import LandingPage from "../pages/LandingPage";
<<<<<<< HEAD
import RoomPage from "../pages/RoomPage";
=======
import AssignmentPage from "../pages/AssignmentPage";
<<<<<<< HEAD
>>>>>>> eff0d4496816647aadd7a5ef9772664b6408ec9a

=======
import RoomsPage from "../pages/RoomsPage";
>>>>>>> c23c0fb (bugs resolved)
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage  />} />
        <Route path="/login" element={<LoginPage  />} />
        <Route path="/signup" element={<SignUpPage />} />
<<<<<<< HEAD
        <Route path="/Dashboard/Room" element={<RoomPage />} />
=======
        <Route path="/AssignmentPage" element={<AssignmentPage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        
>>>>>>> eff0d4496816647aadd7a5ef9772664b6408ec9a

        {/* Redirect any unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
