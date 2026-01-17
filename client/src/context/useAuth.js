import { useContext } from "react";
import ContextApi from "./contextApi";

export default function UseAuth(){
    return useContext(ContextApi)//custom hook
}