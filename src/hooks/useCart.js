import { useContext, useEffect, useState } from "react";
import { CartContext } from "src/context/CartContext";

import CartService from "src/services/cart.service";

export default function useCart() {
     const cartService = new CartService();

     const { carts, setCarts, resource, setResource } = useContext(CartContext);
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState(null);

     useEffect(() => {
          (async () => {
               try {
                    setIsLoading(true);
                    const data = await cartService.getCarts();
                    const transform = cartService.transformToCourseIds(
                         data?.results
                    );
                    setCarts(transform);
                    setResource(data);

                    localStorage.setItem("__cart__", JSON.stringify(transform));
               } catch (error) {
                    setError(error.message);
               } finally {
                    setIsLoading(false);
               }
          })();
     }, []);

     const checkCartExisting = (index) => {
          if (carts.find((cart) => cart === index)) return true;
          return false;
     };

     const refetch = async () => {
          try {
               setIsLoading(true);
               const data = await cartService.getCarts();
               const transform = cartService.transformToCourseIds(
                    data?.results
               );
               setCarts(transform);
               setResource(data);

               localStorage.setItem("__cart__", JSON.stringify(transform));
          } catch (error) {
               setIsLoading(false);
               setError(error.message);
          } finally {
               setIsLoading(false);
          }
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
               const removeResource = resource?.results?.filter(
                    (result) => result.course?.id !== index
               );

               localStorage.setItem("__cart__", JSON.stringify(remove));

               setIsLoading(true);
               setCarts(remove);
               setResource((state) => ({ ...state, results: removeResource }));

               await cartService.deleteCartByCourse(index);
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
          resource,
          refetch,
     };
}
