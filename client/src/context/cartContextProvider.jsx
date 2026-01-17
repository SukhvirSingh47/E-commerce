import { useState, useEffect } from "react";
import CartContext from "./cartContext";
import { toast } from "react-toastify"
import { ImageWithFallback } from "../components/fallback/ImageWithFallback";
export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState([])
    const totalCartItems = cart.length
    function handleAddToCart(product) {
        const exist = cart.some(item => item._id === product._id);

        if (exist) {
            toast.warning("Item already in cart!");
            return;
        }
        
        setCart(prev => {
            //  localStorage.setItem("cartItems",1 )
            return [...prev, { ...product, quantity: 1 }]
        });
        // toast.success(`added to cart${product.image}`);
    
    }
    useEffect(()=>{
        localStorage.setItem("cartItems",[ ...cart])
    },[cart])


    return (
        <CartContext.Provider value={{ cart, totalCartItems, setCart, handleAddToCart }}>
            {children}
        </CartContext.Provider>
    )
}