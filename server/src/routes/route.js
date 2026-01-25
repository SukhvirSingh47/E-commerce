import express from 'express';
import { registerUser, loginUser, GetMe, GetProducts, GetQuery, GetCart, PutCart,DelCart} from "../controllers/authController.js";
import { authMiddleware } from '../middleware/protect.js';
const app_router= express.Router();
 
app_router.post('/register', registerUser);
app_router.post('/login', loginUser);

app_router.get('/me',authMiddleware, GetMe)
app_router.get('/cart',authMiddleware, GetCart)
app_router.get('/products', GetProducts)
app_router.get('/query', GetQuery)

app_router.put('/cart',authMiddleware,PutCart)

app_router.delete('/del',authMiddleware,DelCart)
export default app_router;