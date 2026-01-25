import { Search, Bell, User, ShoppingBag, Menu, ShoppingCart, Loader } from "lucide-react";
import { Input } from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";
import { useEffect, useState } from "react";
import UseAuth from "../context/useAuth.js";
import UseCart from "../context/useCart.js"
import { useNavigate, Link, useActionData } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

export function Header({  handlekey, toggleSidebar, setOpenMobileSearch, openMobileSearch}) {
  // const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { isUser } = UseAuth();
  const { totalCartItems } = UseCart()
  const navigate = useNavigate();
  const [input, setinput] = useState("")
  const [searchParams, setSearchParams]= useSearchParams()

  function handleLogoClick() {
    navigate("/")
  }
  function handlekey(event) {
    if (event.key === 'Enter'&& input.trim()) {
      navigate(`/products?search=${input}`)
      
    }
  }
  useEffect(()=>{
    if(searchParams.get("search")){
      setinput(searchParams.get("search"))
    }
  },[])
  return (
    <header className="border-b bg-white sticky top-0 z-30" onClick={() => setOpenMobileSearch(false)}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8 relative">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleLogoClick} >
            <div className="bg-linear-to-br from-blue-600 to-purple-600 rounded-xl p-2 px-3 shadow-lg">
              <span className="text-white fredoka-logo font-bold text-2xl">CW</span>
            </div>
            <span className="font-bold hidden text-[28px] lg:flex fredoka-logo"><h1
              className="font-fredoka font-semibold tracking-[-0.035em]
              bg-linear-to-br from-blue-600 to-purple-600
              bg-clip-text text-transparent"
            >
              CartWell
            </h1></span>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-2xl relative "onKeyDown={handlekey} >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="search"
              placeholder="Search for products..."
              className="pl-10 pr-4 py-6 rounded-full border-gray-200 w-full"
              onChange={(e) => setinput(e.target.value)}
              onKeyDown={handlekey}
              value={input}
            />
          </div>

          {/* MOBILE SEARCH ICON (< sm) */}

          {/* MOBILE SEARCH INPUT POPUP */}
          {openMobileSearch && (
            <div className="sm:hidden mt-3 absolute top-12.5 left-0 right-0 px-6" onClick={(e) => e.stopPropagation()}>
              <div className="relative"onKeyDown={handlekey}>
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  autoFocus
                  type="search"
                  placeholder="Search for products..."
                  className="pl-10 pr-4 py-5 rounded-full border-gray-200 w-full"
                  onChange={(e) => setinput(e.target.value)}
                  onKeyDown={handlekey}
                  value={input}
                  
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden cursor-pointer"
              onClick={(e) => {
                setOpenMobileSearch(true)
                e.stopPropagation();
              }}
            >
              <Search className="size-6 text-gray-900" />
            </Button>
            <Button variant="ghost" size="icon" className="relative cursor-pointer ">
              <Bell className="size-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Link to={"/cart"}>
              <Button variant="ghost" size="icon" className="relative cursor-pointer">
                <ShoppingCart className="size-6" />
                {totalCartItems !== 0 && <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalCartItems}
                </span>}
              </Button>
            </Link>
            {isUser.loading ? <Button variant="ghost" size="icon" className="cursor-pointer"><User className="size-6" /></Button> :isUser.isLogin ? <Button variant="ghost" size="icon" className="cursor-pointer">
              <User className="size-6" />
            </Button> : <Button className="cursor-pointer bg-linear-to-br from-blue-600 to-purple-600 animate-bounce">
              <Link to={"/login"}><div className=""><h1>Login</h1></div></Link>
            </Button>}
            <Button size="icon" variant="ghost" className="cursor-pointer" onClick={toggleSidebar}>
              <Menu className="size-6"></Menu>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}