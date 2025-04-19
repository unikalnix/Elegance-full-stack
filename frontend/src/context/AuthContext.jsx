import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";
import axios from "axios";
import { useCart } from "./CartContext";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include'
});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const { showToast } = useToast();
  const { getCart } = useCart();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/auth/me");
        if (res.data.success) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLogin(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (loginData, authMode) => {
    const cartData = JSON.parse(localStorage.getItem("_ucd")) || [];
    const wishlistData = JSON.parse(localStorage.getItem("_uwd")) || [];
    
    try {
      const endpoint = authMode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const payload = authMode === "signup" 
        ? { ...loginData, guestCart: cartData, guestWishlist: wishlistData }
        : loginData;

      const res = await api.post(endpoint, payload);

      if (res.data.success) {
        if (authMode === "signup" && JSON.parse(localStorage.getItem("_ucd"))) {
          localStorage.setItem("_ucd", JSON.stringify([]));
        }
        setIsLogin(true);
        showToast("success", res.data.message);
        await getCart();
        return true;
      } else {
        showToast("error", res.data.message);
        return false;
      }
    } catch (error) {
      showToast("error", `Something went wrong ${error.message}`);
      return false;
    }
  };

  const handleLogout = async () => {
    const wishlistData = JSON.parse(localStorage.getItem("_uwd")) || [];
    try {
      const res = await api.post("/api/auth/logout", { guestWishlist: wishlistData });
      if (res.data.success) {
        setIsLogin(false);
        showToast("info", res.data.message);
        await getCart();
      } else {
        showToast("error", "Something went wrong");
      }
    } catch (error) {
      showToast("error", `Something went wrong ${error}`);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
