// Imports
import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

// Component Function
const NotFound = () => {
  // Declarations
  const navigate = useNavigate();

  // Return Component
  return (
    <div className="not-found">
      <div className="not-found__content">
        <div className="not-found__graphic">
          <div className="not-found__number">4</div>
          <div className="not-found__circle">
            <svg
              className="not-found__svg"
              width="180"
              height="180"
              viewBox="0 0 180 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="90" cy="90" r="88" stroke="#000" strokeWidth="2" />
              <circle
                cx="90"
                cy="90"
                r="70"
                stroke="#000"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
              <path
                d="M90 40C117.614 40 140 62.3858 140 90"
                stroke="#000"
                strokeWidth="2"
              />
              <path
                d="M90 140C62.3858 140 40 117.614 40 90"
                stroke="#000"
                strokeWidth="2"
              />
              <circle
                cx="90"
                cy="90"
                r="20"
                fill="#f9f9f9"
                stroke="#000"
                strokeWidth="1"
              />
              <path
                d="M85 85L95 95M95 85L85 95"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="not-found__number">4</div>
        </div>

        <h1 className="not-found__title">Page Not Found</h1>
        <p className="not-found__message">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <button onClick={() => navigate("/")} className="not-found__button">
          <Home size={18} />
          <span>Go to Homepage</span>
        </button>
      </div>

      <div className="not-found__decoration">
        <svg
          className="not-found__dots"
          width="200"
          height="100"
          viewBox="0 0 200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10" cy="10" r="2" fill="#000" />
          <circle cx="30" cy="10" r="2" fill="#000" />
          <circle cx="50" cy="10" r="2" fill="#000" />
          <circle cx="70" cy="10" r="2" fill="#000" />
          <circle cx="90" cy="10" r="2" fill="#000" />
          <circle cx="110" cy="10" r="2" fill="#000" />
          <circle cx="130" cy="10" r="2" fill="#000" />
          <circle cx="150" cy="10" r="2" fill="#000" />
          <circle cx="170" cy="10" r="2" fill="#000" />
          <circle cx="190" cy="10" r="2" fill="#000" />

          <circle cx="10" cy="30" r="2" fill="#000" />
          <circle cx="30" cy="30" r="2" fill="#000" />
          <circle cx="50" cy="30" r="2" fill="#000" />
          <circle cx="70" cy="30" r="2" fill="#000" />
          <circle cx="90" cy="30" r="2" fill="#000" />
          <circle cx="110" cy="30" r="2" fill="#000" />
          <circle cx="130" cy="30" r="2" fill="#000" />
          <circle cx="150" cy="30" r="2" fill="#000" />
          <circle cx="170" cy="30" r="2" fill="#000" />
          <circle cx="190" cy="30" r="2" fill="#000" />

          <circle cx="10" cy="50" r="2" fill="#000" />
          <circle cx="30" cy="50" r="2" fill="#000" />
          <circle cx="50" cy="50" r="2" fill="#000" />
          <circle cx="70" cy="50" r="2" fill="#000" />
          <circle cx="90" cy="50" r="2" fill="#000" />
          <circle cx="110" cy="50" r="2" fill="#000" />
          <circle cx="130" cy="50" r="2" fill="#000" />
          <circle cx="150" cy="50" r="2" fill="#000" />
          <circle cx="170" cy="50" r="2" fill="#000" />
          <circle cx="190" cy="50" r="2" fill="#000" />

          <circle cx="10" cy="70" r="2" fill="#000" />
          <circle cx="30" cy="70" r="2" fill="#000" />
          <circle cx="50" cy="70" r="2" fill="#000" />
          <circle cx="70" cy="70" r="2" fill="#000" />
          <circle cx="90" cy="70" r="2" fill="#000" />
          <circle cx="110" cy="70" r="2" fill="#000" />
          <circle cx="130" cy="70" r="2" fill="#000" />
          <circle cx="150" cy="70" r="2" fill="#000" />
          <circle cx="170" cy="70" r="2" fill="#000" />
          <circle cx="190" cy="70" r="2" fill="#000" />

          <circle cx="10" cy="90" r="2" fill="#000" />
          <circle cx="30" cy="90" r="2" fill="#000" />
          <circle cx="50" cy="90" r="2" fill="#000" />
          <circle cx="70" cy="90" r="2" fill="#000" />
          <circle cx="90" cy="90" r="2" fill="#000" />
          <circle cx="110" cy="90" r="2" fill="#000" />
          <circle cx="130" cy="90" r="2" fill="#000" />
          <circle cx="150" cy="90" r="2" fill="#000" />
          <circle cx="170" cy="90" r="2" fill="#000" />
          <circle cx="190" cy="90" r="2" fill="#000" />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;
