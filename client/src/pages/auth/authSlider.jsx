import { useState } from "react";
import { Chrome, Facebook, Github, Linkedin, User, Lock, Mail, } from "lucide-react";
import SocialIcon from "../../components/ui/icon";
import { LoginForm } from "./login";
import { RegisterForm } from "./register";
import UseAuth from "../../context/useAuth";
// import Loader from "../../components/loader";

export default function AuthSlider() {
  const [login, setLogin] = useState(true);
  const [resetkey, setresetkey] = useState(0);
  const [loading, setloading] = useState(false)
  const { isUser } = UseAuth()
  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-100">
      
      <div className="relative hidden relative sm:block w-225 h-130 bg-white rounded-3xl shadow-xl overflow-hidden">
{loading && <div className="absolute inset-0 bg-[#3838381c] z-10 flex items-center justify-center rounded-2xl">
              <h1 className="text-green-600 flex"> <div className="loader"></div></h1>
            </div>}
        {/* FORMS CONTAINER */}
        <div className="absolute inset-0 flex">

          {/* REGISTER FORM */}
          <div
            className={`w-1/2 flex items-center justify-center transition-all duration-700 ease-in-out
            ${login ? "opacity-0 -translate-x-100 pointer-events-none"
                : "opacity-100 translate-x-0 "}`}
          >
            <RegisterForm resetkey={resetkey} loading={{ loading, setloading }} />
          </div>

          {/* LOGIN FORM */}
          <div
            className={`w-1/2 flex items-center justify-center transition-all duration-700 ease-in-out
            ${login ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-100 pointer-events-none"}`}
          >
            <LoginForm resetkey={resetkey} loading={{ loading, setloading }} />
          </div>
        </div>

        {/* SLIDING PURPLE PANEL */}
        <div
          className={`absolute top-0 h-full w-1/2  text-white 
          transition-all duration-700 ease-in-out overflow-hidden
          ${login ? "left-0 rounded-r-[120px] bg-linear-to-br from-blue-600 to-purple-600"
              : "left-1/2 rounded-l-[120px] bg-linear-to-br from-purple-600 to-blue-600"}`}
        >
          <div className={`flex h-full justify-center items-center text-center w-full transition-all duration-750 ease-in-out ${login ? "translate-x-1/2" : "-translate-x-1/2"}`} >

            <div className="h-full flex flex-col justify-center items-center text-center px-10 w-full shrink-0">
              <h2 className="text-3xl font-bold mb-4">
                Hello, Welcome!
              </h2>
              <p className="text-purple-200 mb-6">
                Don't have an account?
              </p>
              <button
                onClick={() => { setLogin(!login); setresetkey(resetkey + 1) }}
                className="px-10 py-3 border border-white rounded-lg hover:bg-white hover:text-purple-600 transition"
              >
                Register
              </button>
            </div>
            <div className="h-full flex flex-col justify-center items-center text-center w-full px-10 shrink-0">
              <h2 className="text-3xl font-bold mb-4">
                Welcome Back!
              </h2>
              <p className="text-purple-200 mb-6">
                Already have an account?
              </p>
              <button
                onClick={() => { setLogin(!login); setresetkey(resetkey + 1) }}
                className="px-10 py-3 border border-white rounded-lg hover:bg-white hover:text-purple-600 transition"
              >
                Login
              </button>
            </div>
          </div>
        </div>

      </div>
      {/* MOBILE VIEW */}
      <div className="w-full max-w-md sm:hidden relative bg-white rounded-2xl gap-6 flex flex-col  items-center shadow-xl p-6 overflow-hidden">
        {loading && <div className="absolute inset-0 bg-[#3838381c] z-10 flex items-center justify-center rounded-2xl">
          <h1 className="text-green-600 flex"><div className="loader"></div></h1>
        </div>}
        <div className="flex items-center gap-3 cursor-pointer" >
          <div className="bg-linear-to-br from-blue-600 to-purple-600 rounded-xl p-2 px-3 shadow-lg">
            <span className="text-white fredoka-logo font-bold text-2xl">CW</span>
          </div>
          <span className="font-bold text-[28px] flex fredoka-logo"><h1
            className="font-fredoka font-semibold tracking-[-0.035em]
              bg-linear-to-br from-blue-600 to-purple-600
              bg-clip-text text-transparent"
          >
            CartWell
          </h1></span>
        </div>
        {/* Mobile Header Toggle WITH PURPLE SLIDER */}
        <div className="w-full p-1  bg-gray-100 rounded-xl ">

          <div className="relative  overflow-hidden">
            <div
              className={`absolute  top-0 left-0 h-full w-1/2 
        bg-linear-to-r from-blue-600 to-purple-600
        rounded-lg transition-transform duration-500 ease-in-out
        ${login ? "translate-x-0" : "translate-x-full"}`}
            />

            <div className="relative z-10 flex w-full ">
              <button
                onClick={() => { setLogin(true); setresetkey(resetkey + 1) }}
                className={`flex-1 py-2 text-sm  font-medium transition
          ${login ? "text-white" : "text-gray-600"}`}
              >
                Login
              </button>
              <button
                onClick={() => { setLogin(false); setresetkey(resetkey + 1) }}
                className={`flex-1 py-2 text-sm  font-medium transition
          ${!login ? "text-white" : "text-gray-600"}`}
              >
                Register
              </button>
            </div>
          </div>
        </div>

        {/* FORM AREA — PERFECTLY CENTERED */}
        <div className="relative overflow-hidden min-h-95 flex items-center">
          <div
            className={`flex w-full transition-transform duration-500 ease-in-out
      ${login ? "translate-x-0" : "-translate-x-full"}`}
          >
            {/* Login */}
            <div className="w-full shrink-0 flex justify-center">
              <div className="w-full max-w-sm mx-auto flex flex-col items-center">
                <LoginForm resetkey={resetkey} loading={{ loading, setloading }} />
              </div>
            </div>

            {/* Register */}
            <div className="w-full shrink-0 flex justify-center">
              <div className="w-full max-w-sm mx-auto flex flex-col items-center">
                <RegisterForm resetkey={resetkey} loading={{ loading, setloading }} />
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>
  );
}
/* ---------------- UI PARTS ---------------- */
export function Social() {
  return (
    <>
      <p className="text-center text-gray-400 text-sm my-4">
        or login with social platforms
      </p>
      <div className="flex justify-center gap-3">
        <SocialIcon icon={<Chrome size={18} />} />
        <SocialIcon icon={<Facebook size={18} />} />
        <SocialIcon icon={<Github size={18} />} />
        <SocialIcon icon={<Linkedin size={18} />} />
      </div>
    </>
  );
}
