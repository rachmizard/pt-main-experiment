import React from "react";
import AuthProvider from "./AuthContext";
import CartProvider from "./CartContext";
import PopupProvider from "./PopupContext";

const AppProvider = ({ children }) => {
     return (
          <AuthProvider>
               <PopupProvider>
                    <CartProvider>{children}</CartProvider>
               </PopupProvider>
          </AuthProvider>
     );
};

export default AppProvider;
