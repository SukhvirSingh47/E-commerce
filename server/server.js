import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './src/routes/route.js';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(
  express.static(path.join(__dirname, "..", "client", "dist"))  //server rendering react app
);

//Routes
app.use('/auth', authRoutes);

//test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

//Connect to MongoDB and start server
const startServer = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB');
        console.log("DB NAME:", mongoose.connection.name);
        app.listen(process.env.PORT || 5000,()=>{
            console.log(`server running on port http://localhost:${process.env.PORT || 5001}`);
        })
    }catch(error){
        console.error('Error connecting to MongoDB:', error);
    }
}
startServer();