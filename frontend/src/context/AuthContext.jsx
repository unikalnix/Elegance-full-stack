import { createContext, useContext, useEffect } from "react";
import { useToast } from "./ToastContext";
import { useShared } from "./SharedContext";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { showToast } = useToast();
  const { isLogin, setIsLogin, getCart } = useShared();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/check-auth`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        setIsLogin(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (loginData, authMode) => {
    const cartData = JSON.parse(localStorage.getItem("_ucd")) || [];
    const wishlistData = JSON.parse(localStorage.getItem("_uwd")) || [];
    if (authMode === "signup") {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
          { ...loginData, guestCart: cartData, guestWishlist: wishlistData },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          JSON.parse(localStorage.getItem("_ucd")) &&
            localStorage.setItem("_ucd", JSON.stringify([]));
          setIsLogin(true);
          showToast("success", res.data.message);
          // Remove getCart call here
          return true;
        } else {
          showToast("error", res.data.message);
          return false;
        }
      } catch (error) {
        showToast("error", `Something went wrong ${error.message}`);
        return false;
      }
    } else if (authMode === "login") {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
          loginData,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          localStorage.setItem("_ucd", JSON.stringify([]));
          setIsLogin(true);
          showToast("success", res.data.message);
          await getCart();
          return true;
        } else {
          showToast("error", res.data.message);
          return false;
        }
      } catch (error) {
        showToast("error", `Something went wrong ${error}`);
        return false;
      }
    }
  };

  const handleLogout = async () => {
    const wishlistData = JSON.parse(localStorage.getItem("_uwd")) || [];
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
        { guestWishlist: wishlistData },
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsLogin(false);
        showToast("info", res.data.message);
        localStorage.setItem("_uwd", JSON.stringify([]));
        await getCart();
      } else {
        showToast("error", "Something went wrong");
      }
    } catch (error) {
      showToast("error", `Something went wrong ${error}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
