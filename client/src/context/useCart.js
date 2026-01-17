import { useContext } from "react";
import CartContext from "./cartContext";

export default function UseCart(){
    return useContext(CartContext)//custom hook
}