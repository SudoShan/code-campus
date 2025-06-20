import React from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Rooms", to: "/rooms" },
  { name: "Profile", to: "/profile" }
];

const MainNavBar: React.FC<{ streakCount?: number }> = ({ streakCount = 5 }) => {
  const location = useLocation();

  return (
    <div
      style={{
        position: "fixed",
        top: 7,
        left: 0,
        width: "100vw",
        zIndex: 50,
        pointerEvents: "none"
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 0,
        }}
      >
        {/* Left pill */}
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 0,
            display: "flex",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: 9999,
            padding: "6px 24px",
            gap: 16,
            pointerEvents: "auto",
            boxShadow: "0 2px 12px rgba(0,0,0,0.18)"
          }}
        >
          <span className="font-bold text-white text-lg select-none">🚀</span>
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.to}
              className={`px-3 py-1 rounded-full font-medium transition-colors ${
                location.pathname.startsWith(link.to)
                  ? "bg-yellow-400 text-black"
                  : "text-white hover:bg-white/10"
              }`}
              style={{ textDecoration: "none" }}
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/* Right pill */}
        <div
          style={{
            position: "absolute",
            right: 10,
            top: 0,
            display: "flex",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: 9999,
            padding: "6px 20px",
            gap: 18,
            pointerEvents: "auto",
            boxShadow: "0 2px 12px rgba(0,0,0,0.18)"
          }}
        >
          {/* Fire emoji and streak count */}
          <span className="flex items-center text-white font-semibold select-none">
            <span style={{ fontSize: 20, marginRight: 4 }}>🔥</span>
            <span>{streakCount}</span>
          </span>
          {/* Timer icon as link */}
          <Link to="/timer" className="text-white hover:text-yellow-400 transition" style={{ fontSize: 20 }}>
            <span role="img" aria-label="timer">⏲️</span>
          </Link>
          {/* Bell icon */}
          <span className="text-white" style={{ fontSize: 20 }}>
            <span role="img" aria-label="notifications">🔔</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainNavBar;
