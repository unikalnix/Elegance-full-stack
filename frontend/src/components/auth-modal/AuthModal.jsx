// Imports
import React, { useEffect, useState } from "react";
import "./AuthModal.css";
import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

// Component Function
const AuthModal = ({ isOpen, toggleAuthModal }) => {
  // Declarations
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authMode, setAuthMode] = useState("signup");
  const { handleLogin } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loginData = {
      email, password
    }
    if (authMode === 'signup') {
      loginData.fullName = fullName;
      loginData.confirmPassword = confirmPassword
    }

    try {
      const isLogin = await handleLogin(loginData, authMode);
      if (isLogin){
        toggleAuthModal();
        setFullName('')
        setEmail('');
        setPassword('');
        setConfirmPassword('')
      }
    } finally {
      setLoading(false);
    }
  }

  // Return Component
  return (
    <>
      {isOpen && <div className="login-overlay"></div>}
      <div
        style={{
          height: authMode === "signup" ? "400px" : "300px",
        }}
        className={`login-modal ${isOpen ? "active" : ""}`}
      >
        <X
          onClick={toggleAuthModal}
          style={{
            cursor: "pointer",
          }}
        />
        <form
          onSubmit={onSubmitHandler}
          className="login-modal__form"
        >
          {authMode === "signup" && (
            <input
              className="login-modal__input"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          )}
          <input
            className="login-modal__input"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-modal__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {authMode === "signup" && (
            <input
              className="login-modal__input"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            className="login-modal__button login-modal__button--submit"
            type="submit"
            value={loading ? "Please wait..." : authMode === "signup" ? "Signup" : "Login"}
            disabled={loading}
          />
        </form>
        <button
          className="login-modal__button login-modal__button--toggle"
          onClick={() =>
            setAuthMode(authMode === "signup" ? "login" : "signup")
          }
        >
          {authMode === "signup" ? "Switch to Login" : "Switch to Signup"}
        </button>
      </div>
    </>
  );
};

export default AuthModal;
