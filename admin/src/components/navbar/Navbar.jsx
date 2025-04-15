import React from "react";
import "./Navbar.css";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const handleAuth = async () => {};

  return (
    <nav className="navbar">
      <h1 className="navbar__title">
        {currentPath === "/"
          ? "Dashboard"
          : currentPath.slice(1).charAt(0).toUpperCase() + currentPath.slice(2)}
      </h1>
      <button onClick={handleAuth} className="navbar__button">
        Login
      </button>
    </nav>
  );
};

export default Navbar;
