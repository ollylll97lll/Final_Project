import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
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
    },
    {
        timestamps: true
    }
);
const UserModel = mongoose.model('User', userSchema,'Users');
export default UserModel;