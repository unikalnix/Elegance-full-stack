// Import Statements
import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { navItems } from "../../assets/data";
import { Search, ShoppingCart, User, Menu, LogIn } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";
import { Link } from "react-router-dom";
import Dropdown from "../ui/dropdown/Dropdown";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

// Component Functions
const Navbar = ({
  sidebar,
  toggleSidebar,
  searchModal,
  toggleSearchModal,
  authModal,
  toggleAuthModal,
}) => {
  // Declarations
  const [scroll, setScroll] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef(null);
  const isMobile = useIsMobile();
  const { cartData } = useCart();
  const { isLogin } = useAuth();

  // Functions
  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };

  // useEffect hooks
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => { setShowDropDown(false) }, [isLogin])

  useEffect(() => {
    if (sidebar || searchModal || authModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebar, searchModal, authModal]);

  useEffect(() => {

  }, [isLogin])

  // Return Component
  return (
    <>
      <nav
        className="navbar"
        style={{
          height: scroll > 20 ? "50px" : "70px",
          boxShadow: scroll > 20 ? "0 1px 4px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <Link className="link" to="/">
          <h1>Elegance</h1>
        </Link>
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
              <Link key={index} className="link" to={toPath}>
                <li style={isSale ? { color: "rgb(220, 38, 38)" } : {}}>
                  {navItem.charAt(0).toUpperCase() + navItem.slice(1)}
                </li>
              </Link>
            );
          })}
        </ul>
        <div className="navbar-right">
          <Link className="link" to="/admin">
            <button className="admin-nav-button">Admin</button>
          </Link>
          <div className="cart-icon">
            <Link className="link text-black" to="/cart">
              <ShoppingCart size={20} />
            </Link>
            <span>{cartData.length}</span>
          </div>

          <Search
            className="search-icon"
            size={20}
            onClick={toggleSearchModal}
          />

          {!isLogin && <LogIn onClick={toggleAuthModal} className="login-icon" size={20} />}
          {
            isLogin &&
            <>
              <div className="user-dropdown-wrapper">
                <User
                  className="user-icon"
                  size={20}
                  onClick={() => setShowDropDown((prev) => !prev)}
                />
                {showDropDown && (
                  <Dropdown
                    dropDownRef={dropDownRef}
                    toggleDropDown={() => setShowDropDown((prev) => !prev)}
                  />
                )}
              </div>
            </>
          }
          {isMobile && <Menu onClick={toggleSidebar} />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
