import UseAuth from "../context/useAuth"
import { Button } from "./ui/button"
import Loader from "./loader"
import { useState } from "react"
import ConfirmModal from "./ui/confirmModal"
export default function Sidebar(){
    const{isUser}= UseAuth()
    const[open, setOpen]=useState(false)
    function handleLogout(){
        localStorage.removeItem("token")
        window.location.reload();
    }
    return(
        <div className="">
            {isUser.isLogin?<div className="bg-white h-18 opacity-70 flex justify-center items-center"> Hello, {isUser.user}</div>: <div className="bg-white h-18 opacity-70 flex justify-center items-center"><Button><h1>Login</h1></Button></div>}
            <div className="p-9">
                <Button onclick={()=>setOpen(true)} className="bg-linear-to-br from-blue-600 to-purple-600"><h1> Logout </h1></Button>
            </div>
            <ConfirmModal
            open={open}
            title="Do you really want to log out"
            closebtnName="No"
            continuebtnName="Yes"
            onCancel={()=>setOpen(false)}
            onConfirm={handleLogout}
            />
        </div>
    )
}