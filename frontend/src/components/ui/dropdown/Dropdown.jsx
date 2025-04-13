// Imports
import React from "react";
import "./Dropdown.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";

// Component Function
const Dropdown = ({ dropDownRef, toggleDropDown }) => {
  // Declarations
  const navigate = useNavigate();
  const { wishListData } = useCart();
  const { handleLogout } = useAuth();

  // Return Component
  return (
    <div ref={dropDownRef} className="dropdown">
      <ul className="dropdown__list">
        {/* Account Section */}
        <li className="dropdown__item dropdown__item--account">Account</li>
        <hr className="dropdown__divider" />

        {/* Navigation Links */}
        <li
          onClick={() => {
            navigate("/dashboard");
            toggleDropDown();
          }}
          className="dropdown__item"
        >
          Dashboard
        </li>
        <li
          onClick={() => {
            navigate("/orders");
            toggleDropDown();
          }}
          className="dropdown__item"
        >
          My Orders
        </li>
        <li
          onClick={() => {
            navigate("/wishlist");
            toggleDropDown();
          }}
          className="dropdown__item"
        >
          Wishlist <span>{wishListData.length}</span>
        </li>

        <hr className="dropdown__divider" />

        {/* Settings & Sign Out */}
        <li
          onClick={() => {
            navigate("/dashboard");
            toggleDropDown();
          }}
          className="dropdown__item"
        >
          Settings
        </li>
        <li
          onClick={() => handleLogout()}
          className="dropdown__item dropdown__item--signout"
        >
          Sign Out
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
