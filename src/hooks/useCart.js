import { useContext, useEffect, useState } from "react";
import { CartContext } from "src/context/CartContext";
import CartService from "src/services/cart.service";

export default function useCart() {
     const cartService = new CartService();

     const { carts, setCarts } = useContext(CartContext);
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState(null);

     useEffect(() => {
          (async () => {
               const data = await cartService.getCarts();
               const transform = cartService.transformToCourseIds(
                    data?.results
               );
               localStorage.setItem("__cart__", JSON.stringify(transform));
               setCarts(transform);
          })();
     }, []);

     const checkCartExisting = (index) => {
          if (carts.find((cart) => cart === index)) return true;
          return false;
     };

     const addCart = async (courseId) => {
          try {
               setIsLoading(true);

               if (checkCartExisting(courseId)) return;

               setCarts((state) => {
                    localStorage.setItem(
                         "__cart__",
                         JSON.stringify([...state, courseId])
                    );
                    return [...state, courseId];
               });

               await cartService.createCart({ course: courseId });
          } catch (error) {
               setIsLoading(false);
               setError(error.message);
          } finally {
               setIsLoading(false);
               setError(null);
          }
     };

     const removeCart = async (index) => {
          try {
               const remove = carts.filter((cart) => cart !== index);

               localStorage.setItem("__cart__", JSON.stringify(remove));

               setIsLoading(true);
               await cartService.deleteCartByCourse(index);
               setCarts(remove);
          } catch (error) {
               setIsLoading(false);
               setError(error.message);
          } finally {
               setIsLoading(false);
               setError(null);
          }
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
          isLoading,
          error,
     };
}
