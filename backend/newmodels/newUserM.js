import mongoose from 'mongoose';

const newUserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
            require: true
        },
        info: {
            fullName: {
                type: String
            },
            dateofBirth: {
                type: String,
            },
            address: {
                type: String,
            },
            city: {
                type: String,
            },
            ward: {
                type: String,
            },
            district: {
                type: String,
            },
            lat: {
                type: Number
            },
            lng: {
                type: Number
            },
            telNum: {
                type: Number,
            },
        }
    },
    {
        timestamps: true
    }
);
const newUserModel = mongoose.model('user', newUserSchema, 'users');
export default newUserModel;