import { useContext } from "react";
import { CartContext } from "src/context/CartContext";

export default function useCart() {
     const { carts, setCarts } = useContext(CartContext);

     const checkCartExisting = (index) => {
          if (carts.find((cart) => cart === index)) return true;
          return false;
     };

     const addCart = (cart) => {
          if (checkCartExisting(cart)) return;

          setCarts((state) => {
               localStorage.setItem(
                    "__cart__",
                    JSON.stringify([...state, cart])
               );
               return [...state, cart];
          });
     };

     const removeCart = (index) => {
          const remove = carts.filter((cart) => cart !== index);

          localStorage.setItem("__cart__", JSON.stringify(remove));

          setCarts(remove);
     };

     const clearCart = () => {
          setCarts([]);
          localStorage.removeItem("__cart__");
     };

     return {
          carts,
          addCart,
          removeCart,
          clearCart,
     };
}
