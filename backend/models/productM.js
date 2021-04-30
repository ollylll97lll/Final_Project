import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true
        },
        image: {
            type: String,
            require: true
        },
        coll3ction: {
            type: String, 
            require: true
        },
        category: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true
        },
        price: {
            type: Number, 
            require: true
        },
        countInStock: {
            type: Number, 
            require: true
        }
    },
    {
        timestamps: true
    }
);
const productModel = mongoose.model('Product', productSchema, 'Products');
export default productModel;