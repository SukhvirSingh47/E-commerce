import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import ContextProvider from './context/contextProvider.jsx';
import CartContextProvider from "./context/cartContextProvider.jsx"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
  <ContextProvider>
  <CartContextProvider>
    <App />
  </CartContextProvider>
  </ContextProvider>
  </BrowserRouter>
  // </StrictMode>,
)
