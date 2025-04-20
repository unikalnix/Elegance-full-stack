import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SharedProvider } from "./context/SharedContext.jsx";

const AppProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <SharedProvider>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </SharedProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(
  <AppProviders>
    <App />
  </AppProviders>
);
