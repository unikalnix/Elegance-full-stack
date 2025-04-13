// Imports
import React from "react";
import { categories } from "../../assets/data";
import { navItems } from "../../assets/data";
import "./Sidebar.css";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

// Component Function
const Sidebar = ({ isOpen, toggleSidebar }) => {
  // Return Component
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="cross-icon">
        <h1>Elegance</h1>
        <X onClick={toggleSidebar} />
      </div>
      <ul>
        {navItems.map((navItem, index) => {
          const isCategory = ["men", "women", "kids", "accessories", "sale"].includes(navItem.toLowerCase());
          const isSale = navItem.toLowerCase() === "sale";

          let toPath = "/";

          if (navItem.toLowerCase() === "shop") {
            toPath = "/shop";
          } else if (isCategory) {
            toPath = `/shop?category=${navItem.toLowerCase()}`;
          } else {
            toPath = `/${navItem.toLowerCase()}`;
          }

          return (
            <Link key={index} className="link text-black" to={toPath}>
              <li onClick={() => {
                toggleSidebar();
              }} style={isSale ? { color: "rgb(220, 38, 38)" } : {}}>
                {navItem.charAt(0).toUpperCase() + navItem.slice(1)}
              </li>
            </Link>
          );
        })}

      </ul>
    </div>
  );
};

export default Sidebar;
