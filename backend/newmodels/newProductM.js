import mongoose from 'mongoose';

const newProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true
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
        thumbnailimg: {
            type: String
        },
        variants: [
            {
                colors: {
                    name: {
                        type: String,
                        required: 'true'
                    },
                    hexcolor: {
                        type: String,
                        required: 'true'
                    }
                },
                discount: {
                    type: Number,
                    required: true,
                },
                imagefolder: {
                    type: String
                },
                amount: [
                    {
                        size: {
                            type: String,
                            required: true,
                        },
                        countInStock: {
                            type: Number,
                            require: true
                        }
                    }
                ]
            }
        ]
    },
    {
        timestamps: true
    }
);
const newProductModel = mongoose.model('product', newProductSchema, 'products');
export default newProductModel;