// Imports
import React from "react";
import "./Breadcrumb.css";
import { useNavigate } from "react-router-dom";

// Component Function
const Breadcrumb = ({ links }) => {
  // Declarations
  const navigate = useNavigate();

  // Return Component
  return (
    <div className="breadcrumb">
      {links.map((link, i) => {
        return (
          <span
            onClick={() => navigate(link.toLowerCase() === "home" ? "/" : `/${link}`)}
            className={`breadcrumb__item ${
              i === links.length - 1 ? "breadcrumb__item--active" : ""
            }`}
            key={i}
          >
            {link} /{" "}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
