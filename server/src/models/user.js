import mongoose from 'mongoose';
import Products from './products.js';
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true, // remove whitespace PREVENT GARBAGE DATA
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true, //same here PREVENT GARBAGE DATA
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // allowed roles
        default: 'user', // default role for new users
    }
},{timestamps:true});

export default mongoose.model('User',userSchema);