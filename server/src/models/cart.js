import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1
        }
      }
    ]
  },
  { timestamps: true }
);

// Index for fast lookup
// cartSchema.index({ user: 1 });

export default mongoose.model('Cart', cartSchema);

//i can also write like this below but it accepts any array ther is No validation, No security, No sturcture*********************
    // productItems:{ 
        //     type:Array
        // }   
        // we should write this instead-----------|
        //                                        |   
        //                                        |   
        //                                        |   
        //                                       \ /   
        //                                        |   
    //     Think of it like a class / blueprint 🧠
    // This is NOT data
    // {
    //   productId: ObjectId,
    //   quantity: Number
    // }
    
    // This IS a rule
    
    // “Every item inside productItems[] must look like this.”