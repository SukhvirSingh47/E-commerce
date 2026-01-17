import { useState, useEffect } from "react";
import { FormInput } from "../../components/ui/input";
import { Social } from "./authSlider";
import UseAuth from "../../context/useAuth";
import { useNavigate } from "react-router-dom";
export function RegisterForm({ resetkey }) {
    const navigate = useNavigate()
    const [res, setres] = useState("")
    const [rescolor, setrescolor] = useState("")
    const [name, setname] = useState("")
    const [pass, setpass] = useState("")
    const [mail, setmail] = useState("")
    const { isUser, setISUser } = UseAuth()
    async function handleSubmit() {
        setISUser(prev => ({ ...prev, loading: true }))
        try {
            const res = await fetch("http://10.125.121.193:5001/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,
                    email: mail,
                    password: pass
                })
            });
            const data = await res.json();
            if (!res.ok) {
                setrescolor("red");
                setres(data.message)
                console.log(`res is${res}`)
                setISUser(prev => ({ ...prev, loading: false, isLogin: false }))
            } else {
                setrescolor("green");
                if (data.token !== undefined) {
                    setres(data.message)
                    localStorage.setItem("token", data.token);
                    setISUser(prev => ({ ...prev, user: data.user.name, token: data.token, isLogin: true }))
                    setTimeout(() => {// it delay when user registered successfully and redirected to / home page
                        setISUser(prev => ({ ...prev, loading: false }))
                    }, 2000);
                    // navigate("/");
                }
                else {
                    setres("invalid token")
                    setISUser(prev => ({ ...prev, loading: false, isLogin: false }))
                }
            }

            console.log(data);

        } catch (error) {
            setISUser(prev => ({ ...prev, loading: false, isLogin: false }))
        }
    }
    useEffect(() => {
        setname("");
        setmail("");
        setpass("");
        setres("");
    }, [resetkey])

    useEffect(() => {
        if (isUser.isLogin) {
            navigate("/");
        }
    }, [isUser.isLogin])
    return (
        <div className="w-3/4 relative">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Register</h2>
            <FormInput placeholder="Username" value={name} onchange={(e) => setname(e.target.value)} />
            <FormInput placeholder="Email" value={mail} onchange={(e) => setmail(e.target.value)} />
            <FormInput placeholder="Password" value={pass} type="password" onchange={(e) => setpass(e.target.value)} />
            <div className="text-sm h-3 w-full flex justify-center items-center " style={{ color: `${rescolor}` }}>{res}</div>
            <button className="w-full py-3 mt-4 bg-purple-600 text-white rounded-lg" onClick={handleSubmit}>
                Register
            </button>
            <Social />
        </div>
    );
}