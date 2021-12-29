import React, { createContext, useMemo, useState } from "react";

export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
     const convertJson = JSON.parse(localStorage.getItem("__cart__"));

     const [carts, setCarts] = useState(convertJson || []);

     const [resource, setResource] = useState({});

     const value = { carts, setCarts, resource, setResource };

     return (
          <CartContext.Provider value={value}>{children}</CartContext.Provider>
     );
};

export default CartProvider;
