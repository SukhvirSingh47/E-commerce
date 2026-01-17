import express from 'express';
import { registerUser, loginUser, me,cart,products,catagory } from "../controllers/authController.js";
import { authMiddleware } from '../middleware/protect.js';
const app_router= express.Router();
 
app_router.post('/register',registerUser);

app_router.post('/login',loginUser);

app_router.get('/protected',authMiddleware,me)
app_router.get('/me',authMiddleware, me)
app_router.post('/cart',cart)
app_router.get('/products',products)
app_router.post('/cata',catagory)
    
export default app_router;