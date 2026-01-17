import { useState } from 'react'
import './App.css'
import {Slide, ToastContainer} from "react-toastify"
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/public/home.jsx'
import LoginForm from './pages/auth/authSlider.jsx'
import CartDisplay from './components/cartDrawer.jsx'
import ProductLists from './pages/public/productList.jsx'
import { Slash, Slice } from 'lucide-react'
function App() {

  return (
    <>
    <ToastContainer 
      position='top-right'
      autoClose={2000}
      hideProgressBar={true}
      pauseOnHover
      transition={Slide}
      theme='dark'
      closeButton={false}
    />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/cart' element={<CartDisplay/>}/>
        <Route path='/products' element={<ProductLists/>}/>
      </Routes>
    </>
  )
}

export default App
