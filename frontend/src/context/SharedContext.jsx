import { createContext, useContext, useState } from "react";
import { useToast } from "./ToastContext";
import axios from "axios";

const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [wishListData, setWishListData] = useState([]);
  const { showToast } = useToast();

  const getCart = async () => {
    if (isLogin) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/get`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setCartData(res.data.cart);
        }
      } catch (error) {
        showToast("error", error.message);
      }
    } else {
      setCartData(JSON.parse(localStorage.getItem("_ucd") || []));
    }
  };

  return (
    <SharedContext.Provider
      value={{
        isLogin,
        setIsLogin,
        cartData,
        setCartData,
        wishListData,
        setWishListData,
        getCart,
      }}
    >
      {children}
    </SharedContext.Provider>
  );
};

export const useShared = () => useContext(SharedContext);