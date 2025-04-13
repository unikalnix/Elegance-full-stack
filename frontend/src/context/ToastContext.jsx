import React, { createContext, useState, useContext } from "react";
import Toast from "../components/toast/Toast";

// Create a context
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ visible: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ visible: true, type, message });

    setTimeout(() => {
      setToast({ visible: false, type: "", message: "" });
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      {toast.visible && (
        <Toast
          visible={toast.visible}
          type={toast.type}
          message={toast.message}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
