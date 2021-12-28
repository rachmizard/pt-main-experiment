import React, { createContext, useMemo, useState } from "react";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
     const convertJson = JSON.parse(localStorage.getItem("__cart__"));

     const [carts, setCarts] = useState(convertJson || []);

     const value = useMemo(() => {
          return { carts, setCarts };
     }, [carts, setCarts]);

     return (
          <CartContext.Provider value={value}>{children}</CartContext.Provider>
     );
};

export default CartProvider;
