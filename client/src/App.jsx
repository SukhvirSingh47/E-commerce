import { useState } from 'react'
import './App.css'
import { Slide, ToastContainer } from "react-toastify"
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/public/home.jsx'
import LoginForm from './pages/auth/authSlider.jsx'
import CartDisplay from './components/cartDrawer.jsx'
import ProductLists from './pages/public/productList.jsx'
import { Slash, Slice } from 'lucide-react'
import ProductDetails from './pages/public/productDetails.jsx'
import ScrollToTop from "./components/scrollToTop.jsx"
import UserDashboard from "./pages/user/dashboard.jsx";
import ProtectedRoute from './routes/protectedRoute.jsx'
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
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/cart' element={<CartDisplay />} />
        <Route path='/products' element={<ProductLists />} />
        <Route path='/productInfo/:id' element={<ProductDetails />} />
        {/* <Route path='/dashboard' element={<UserDashboard />} /> */}
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
