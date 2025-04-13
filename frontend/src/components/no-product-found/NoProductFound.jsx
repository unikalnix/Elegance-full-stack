// Imports
import React from "react";
import "./NoProductFound.css"; // Importing CSS file
import { ShoppingBag } from "lucide-react";

// Component Function
const NoProductFound = ({handleClearAllFilters}) => {
  // Return Component
  return (
    <div className="no-products">
      <div className="no-products__content">
        <div className="no-products__icon">
          <ShoppingBag size={48} strokeWidth={1.5} />
          <svg
            className="no-products__svg"
            width="160"
            height="160"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="80" cy="80" r="79" stroke="#F0F0F0" strokeWidth="2" />
            <circle cx="80" cy="80" r="60" stroke="#F0F0F0" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M50 80C50 63.4315 63.4315 50 80 50" stroke="#000000" strokeWidth="2" />
            <path d="M110 80C110 96.5685 96.5685 110 80 110" stroke="#000000" strokeWidth="2" />
          </svg>
        </div>

        <h1 className="no-products__title">No Products Found</h1>
        <p className="no-products__message">
          We couldn't find any products matching your criteria. Please try adjusting your filters or search terms.
        </p>

        <div className="no-products__suggestions">
          <h2 className="no-products__suggestions-title">You might want to:</h2>
          <ul className="no-products__suggestions-list">
            <li>Check for spelling errors in your search</li>
            <li>Use more general search terms</li>
            <li>Clear all filters and start again</li>
            <li>Browse our categories for inspiration</li>
          </ul>
        </div>

        <button onClick={handleClearAllFilters} className="no-products__button">Reset Filters</button>
      </div>
    </div>
  )
};

export default NoProductFound;
