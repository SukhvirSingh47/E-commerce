import { useState, useEffect } from "react";
import ContextApi from "./contextApi";
import { getMe } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
export default function ContextProvider({ children }) {
    const [isUser, setISUser] = useState({
        user: null,
        email: null,
        role: null,
        token: null,
        isLogin: false,
        loading: true
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token")

        async function checkUser() {
            if (!token) {
                setTimeout(() => {//it creates some delay when user is logout and go the the / home route
                    setISUser(prev => ({ ...prev, loading: false }));
                }, 1000);
                return;
            }
            try {
                const data = await getMe()
                setTimeout(() => { // is it used to delay when use is logged in and first enter the / home route
                    setISUser(prev => ({
                        ...prev,
                        user: data.user.name,
                        email: data.user.email,
                        role: data.user.role,
                        isLogin: true,
                        loading: false
                    }));

                }, 1000);

                console.log(data)
            } catch (error) {
                // localStorage.removeItem("token")
                console.log("catched from context API", error)
                setISUser(prev => ({ ...prev, loading: false, isLogin: false }))
            }
        }
        checkUser();
    }, [])
   
    return (
        <ContextApi.Provider value={{ isUser, setISUser }}>
            {children}
        </ContextApi.Provider>
    )
}
