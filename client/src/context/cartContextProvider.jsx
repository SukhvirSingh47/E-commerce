import { useState, useEffect } from "react";
import CartContext from "./cartContext";
import { toast } from "react-toastify"
import { ImageWithFallback } from "../components/fallback/ImageWithFallback";
import UseAuth from "./useAuth";
import { getCart, addToCart } from "../api/cart.api";

export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || [])
    const { isUser } = UseAuth()
    const totalCartItems = cart.length

    async function handleAddToCart(product) {
        const exist = cart.some(item => item.productId._id === product._id);

        if (exist) {
            toast.warning("Item already in cart!");

            return;
        }
        // Optimistic UI
        setCart(prev => {
            return [...prev, { productId: { ...product }, quantity: 1 }]
        });

        try{
            const updatecart= await addToCart(product._id)
            setCart(updatecart);
            toast.success("Added to cart")
        }catch(err){
            toast.error(err.message)
            console.log("error",err)
        }
    }
    useEffect(() => {
        async function loadCart() {
            if (!isUser.isLogin || isUser.loading) return;
            try {
                const cartData = await getCart()
                setCart(cartData)
            } catch (err) {
                console.log("Using local cart");
                // toast.error(err.message)
            }
        }
        loadCart()
    }, [isUser.isLogin, isUser.loading])


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    return (
        <CartContext.Provider value={{ cart, totalCartItems, setCart, handleAddToCart }}>
            {children}
        </CartContext.Provider>
    )
}