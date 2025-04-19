import React from "react";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const currentPath = location.pathname;

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/logout`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setIsAuthenticated(false);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="navbar">
      <h1 className="navbar__title">
        {currentPath === "/"
          ? "Dashboard"
          : currentPath.slice(1).charAt(0).toUpperCase() +
            currentPath.slice(2).split("/")[0]}
      </h1>
      <button onClick={handleLogout} className="navbar__button">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
