import {useState, useEffect} from "react";
import ContextApi from "./contextApi";

export default function ContextProvider({children}){
    const [isUser, setISUser]=useState({ user: null, token:null, isLogin:false, loading:true })
    
    useEffect(()=>{
        const token= localStorage.getItem("token")
        async function checkUser(){
           if (!token){
            setTimeout(() => {//it creates some delay when user is logout and go the the / home route
                setISUser(prev=>({...prev, loading:false }));
            }, 1000);
            return;
           } 
           try{
            const res= await  fetch("http://10.125.121.193:5001/auth/me",{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            if (!res.ok){
                throw new Error("Invalid token")
            }
            const data= await res.json();
            setTimeout(() => { // is it used to delay when use is logged in and first enter the / home route
                setISUser(prev=>({...prev,user: data.user.name, loading:false, isLogin:true }))
            }, 1000);
            //  console.log(isUser.user)
           }catch(err){
            if (err==="Invalid token"){
                // localStorage.removeItem("token")
            }
            console.log("catched from context API",err)
            setISUser(prev=>({...prev, loading:false, isLogin:false }))
           }
        }
        checkUser();
    },[])
    return(
        <ContextApi.Provider value={{isUser, setISUser}}>
            {children}
        </ContextApi.Provider>
    ) 
}
