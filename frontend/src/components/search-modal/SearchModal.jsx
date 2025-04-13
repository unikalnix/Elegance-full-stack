// Imports
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import "./searchModal.css";

// Component Function
const SearchModal = ({ isOpen, toggleSearchModal }) => {
  // Declarations
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(queryParams.get("search") || "");

  // Functions
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      toggleSearchModal(); // Close modal after search
    }
  };

  // Return Component
  return (
    <div className={`search-container ${isOpen ? "active" : ""}`}>
      <div className="search-overlay"></div>
      <div className="search-modal">
        <div className="top-layer">
          <h2>Search products</h2>
          <X className="top-layer--cross-icon" onClick={toggleSearchModal} />
        </div>
        <div className="middle-layer">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Search on Enter key
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="bottom-layer">
          <h2>Popular searches</h2>
          <ul className="search-boxes">
            {["Summer Collection", "Dresses", "Shirts", "Accessories"].map(
              (item, index) => (
                <li key={index} onClick={() => setSearchTerm(item)}>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
