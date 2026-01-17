import mongoose, { model, Schema } from 'mongoose'
const porductSchema = new mongoose.Schema({
    // id: 2,
    name: {
        type: String,
        required: true,
        trim: true
    }
    ,
    discriprtion: {
        type: String,
        trim: true
    }
    ,
    price: {
        type: Number,
        required: true,
        min: 0
    },
    originalPrice: {
        type: Number,
        required: true
    },
    reviews: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    category: {
        type: String,
        index: true
    },
    image: {
        type: [String],
        required: true
    },
    badge: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

export default mongoose.model('Products', porductSchema)