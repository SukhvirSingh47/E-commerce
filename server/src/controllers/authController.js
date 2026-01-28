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
//------------------------------------------------------------------------------
export const GetMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("_id name email");

    if (!user) {
      return res.status(401).json({
        message: "User not found or token invalid"
      });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("GET /auth/me error:", error);
    res.status(500).json({
      message: "Error getting user details"
    });
  }
};

//-----------------cart controller------------------------------------------
export const PutCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let cart = await Cart.findOneAndUpdate(
            {
                user: req.user.id,
                "items.productId": productId
            },
            {
                $inc: { "items.$.quantity": quantity }
            },
            { new: true }
        );

        if (!cart) {
            cart = await Cart.findOneAndUpdate(
                { user: req.user.id },
                {
                    $push: { items: { productId, quantity } }
                },
                { upsert: true, new: true }
            );
        }

        const populatedCart = await Cart.findOne({ user: req.user.id })
            .populate("items.productId");

        return res.status(200).json(populatedCart.items);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Cart update failed" });
    }
};


export const GetCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate("items.productId")
        if (!cart) {
            return res.status(404).json({ message: "cart not found -backend" })
        }
        else {
            console.log("useris :", cart.items)
            return res.status(200).json(cart.items)
        }
    } catch (err) {
        console.log("error here", err)
    }
}
export const DelCart = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'needs body to delete' })
        }
        const { productId, quantity } = req.body; 
        console.log(productId, quantity)
        if (!productId) {
            return res.status(400).json({ message: 'needs product id to delete' })
        }
        let cart = await Cart.findOneAndUpdate(
            { user: req.user.id },
            { $pull: { items: { productId } } },
            { new: true } // return the updated document
        );

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        const populatedCart = await Cart.findOne({ user: req.user.id })
            .populate("items.productId");

        return res.status(200).json(populatedCart.items);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Cart deletion failed" });
    }
}
//---------------------------Query controllers-------------------------------------
export const GetProducts = async (req, res) => {
    const prodts = await Products.find();
    res.json(prodts);
}

export const GetQuery = async (req, res) => {
    try {
        const { search } = req.query;
        if (!search) {
            return res.status(400).json({ message: 'please enter request' });
        }
        const prodts = await Products.find({ $text: { $search: search } });
        res.json(prodts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export const GetProductInfo = async (req, res)=>{
    try {
        const {id}=req.query
        if(!id){
            return res.status(400).json({ message: 'please give product id' });
        }
        console.log(id)
        const product= await Products.findById(id)
        return res.status(200).json(product)
        console.log(product)
    } catch (error) {
        console.log("error:", error)
    }
}