// Imports
import { useState, useEffect } from "react";

// Hook Function
const useIsMobile = (breakpoint = 768) => {
  // Declarations
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  // Functions
  const handleResize = () => {
    setIsMobile(window.innerWidth <= breakpoint);
  };

  // useEffect Hook
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Return Hook Value
  return isMobile;
};

// Export
export default useIsMobile;
