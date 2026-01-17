import { useState, useEffect } from "react";
import { FormInput } from "../../components/ui/input";
import { Social } from "./authSlider";
import { useNavigate } from "react-router-dom"
import UseAuth from "../../context/useAuth";
import Home from "../public/home";
import Loader from "../../components/loader";
export function LoginForm({ resetkey }) {
  const [rescolor, setrescolor] = useState("")
  const [res, setres] = useState("")
  const [mail, setmail] = useState("")
  const [pass, setpass] = useState("")
  const { isUser, setISUser } = UseAuth()
  const navigate = useNavigate();
  async function handleSubmit() {
    const token = localStorage.getItem("token")
    setISUser(prev => ({ ...prev, loading: true }))
    try {
      const res = await fetch("http://10.125.121.193:5001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: mail,
          password: pass
        })
      });
      const data = await res.json();
      if (res.ok) {
        setrescolor("green");
        localStorage.setItem("token", data.token);
        setres(data.message)
        setISUser(prev => ({ ...prev, user: data.user.name, token: data.token, isLogin: true }))
        setTimeout(() => { // it delay when user login successfully and redirected to / home page
          setISUser(prev => ({ ...prev,  loading: false }))
        }, 2000);
        console.log(data);
        // navigate("/")
      } else {
        setrescolor("red");
        setres(data.message);
        setISUser(prev => ({ ...prev, loading: false, isLogin: false }))
      }
    } catch (error) {
      console.log(error)
      setres(error)
      setISUser(prev => ({ ...prev, loading: false, isLogin: false }))
    }
  }
  useEffect(() => {
    setmail("");
    setpass("")
    setres("");
  }, [resetkey])
  useEffect(() => {
    if (isUser.isLogin) {
      console.log("i am in navigate")
      navigate("/");
    }
  }, [isUser.isLogin])
  
  return (
    <div className="w-3/4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Login</h2>
      <FormInput placeholder="Email" value={mail} onchange={(e) => setmail(e.target.value)} />
      <FormInput placeholder="Password" value={pass} type="password" onchange={(e) => setpass(e.target.value)} />
      <div className="text-sm h-1" style={{ color: `${rescolor}` }}>{res}</div>
      <p className="text-sm text-purple-600 text-right mb-4 cursor-pointer">
        Forgot password?
      </p>
      <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg" onClick={handleSubmit}>
        Login
      </button>
      <Social />
    </div>
  );
}