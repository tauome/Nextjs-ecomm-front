import { createContext, useEffect } from "react";
import { useState } from "react";

export const CartContext = createContext();


export function CartContextProvider({children}){
    const [cartProducts, setCartProducts] = useState([]);

   //store cartProducts in local storage when cartProducts changes 
    useEffect(() => {
        if (cartProducts?.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartProducts)); 
        }
    }, [cartProducts])

    //get cartProducts from local storage when component mounts and store them in state
    useEffect(() => {
        const defaultProducts = localStorage ? JSON.parse(localStorage.getItem('cart')) : []; 
        setCartProducts(defaultProducts);
    }, [])


    function addProduct(productId) {
        setCartProducts((prev) => Array.isArray(prev) ? [...prev, productId] : [productId]); 
    }

    function removeProduct(productId) {
        setCartProducts((prev) => {
          const updatedProducts = prev.slice();
          const pos = updatedProducts.indexOf(productId);
          if (pos !== -1) {
            updatedProducts.splice(pos, 1);
          }
          return updatedProducts;
        });
      }
      
   

    return (
        <CartContext.Provider value={{cartProducts, setCartProducts, addProduct, removeProduct}}>{children}</CartContext.Provider>
    );
}

