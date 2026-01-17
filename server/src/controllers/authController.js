import User from '../models/user.js';
// import UserSetting from '../models/userSetting.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Cart from '../models/cart.js'
import Products from '../models/products.js'
export const registerUser = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'please enter all fields' });//{} is the body
        }
        const { name, email, password } = req.body;

        //basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'please enter all fields' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'password must be at least 6 characters long' })
        }
        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'user already exists' });
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //save user
        const newUser = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
        });

        //create and assign a token
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.status(200).json({
            message: 'user created successfully',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    }
    catch (error) {
        console.error("error catched", error);
        res.status(500).json({ message: 'server error' });
    }
}
export const loginUser = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'please enter all fields' });//{} is the body
        }
        const { email, password } = req.body;

        //basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'please enter all fields' });
        }

        //check for existing user
        const existingUser = await User.findOne({ email });//it contains user name,email,password in object form
        if (!existingUser) {
            return res.status(400).json({ message: 'invalid credentials' });
        }

        //compare password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'your password is incorrect' });
        }
        //create and assign a token
        const token = jwt.sign(
            { id: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.status(200).json({
            message: 'user logged in successfully',
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
            },
        });
    }
    catch (error) {
        console.error("error catched", error);
        res.status(500).json({ message: 'server error' });
    }
}
//-----------------------------define user setting controller-----------------------------
// export const getsettings= async(req,res)=>{
//     try{
//         const settings = await UserSetting.findOne({user:req.user.id});
//         if(!settings){
//             return res.status(404).json({message:'settings not found, its ok you can create it'});
//         }
//         res.status(200).json(settings);
//     }catch(error){
//         console.error("error catched",error);
//         res.status(500).json({message:'error getting user settings database'});
//     }
// }

// export const updatesettings= async(req,res)=>{
//     try{
//         const {theme}= req.body;
//         const updates={};
//         if (theme!== undefined){updates.theme=theme;};
//         // if (language!==undefined){updates.language=language;};

//         const updatedSettings= await UserSetting.findOneAndUpdate(
//             {user:req.user.id},
//             {$set:updates},
//             {new:true, upsert:true} //upsert:true creates a new document if no document matches the filter
//         );
//         res.status(200).json(updatedSettings);
//     }catch(error){
//         console.error("error catched",error);
//         res.status(500).json({message:'error updating user settings database'});
//     }
// }
//------------------------------------------------------------------------------
export const me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('name email');
        res.json({ user, info: req.user });
    } catch (error) {
        console.error("error catched", error);
        res.status(500).json({ message: 'error getting user details' });
    }
}
//-----------------cart controller------------------------------------------
export const cart = async (req, res) => {
    const cart = req.body
    console.log(cart)
    cart.map((products) => {
        console.log(products.name)
    })
    res.json({ cart })
}


export const products = async (req, res) => {
    const prodts = await Products.find();
    res.json(prodts);
}

export const catagory = async (req, res) => {
    const { category } = req.body
    if (!category) {
        return res.status(400).json({ message: 'please enter request' });
    }
    console.log(category)
    const prodts = await Products.find({
        $text: { $search: category }
    });
    res.json(prodts);
    console.log(prodts)
}