// Imports
import React from "react";
import "./Title.css";

// Component Function
const Title = ({ title, description }) => {
  // Return Component
  return (
    <div className="title-container">
      <h1 className="title">{title}</h1>
      <p className="description">{description}</p>
    </div>
  );
};

export default Title;
