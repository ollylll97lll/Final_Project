import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import UserModel from '../models/userM.js'
import sampledata from '../sampledata.js'
import bcrypt from 'bcrypt';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // remove all data
    // commented out after seed
    await UserModel.remove({});
    const createUsers = await UserModel.insertMany(sampledata.users);
    res.send({ createUsers });
})
);

userRouter.post('/login', expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid Email or Password' });
})
);

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    const createUser = await user.save();
    res.send(
        {
            _id: createUser._id,
            name: createUser.name,
            email: createUser.email,
            isAdmin: createUser.isAdmin,
            token: generateToken(createUser)
        }
    )
}))

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User not found' })
    }
}))

userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const user = await UserModel.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8);
            }
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser),
            });
        }
    })
)

userRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const users = await UserModel.find({});
        res.send(users);
    })
);

userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    if (user) {
        if (user.email === 'admin@admin.com') {
            res.status(400).send({ message: 'This user is Admin. REFUSE TO DELETE THIS ACCOUNT' });
            return;
        }
        const deleteUser = await user.remove();
        res.send({
            message: "User Deleted",
            user: deleteUser
        });
    } else { res.status(404).send({ message: "User Not Found To Delete" }) };

}))

userRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await UserModel.findById(req.params.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.isAdmin = req.body.isAdmin || user.isAdmin;

            const updatedUser = await user.save();
            res.send({ message: 'User Updated', user: updatedUser });
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    })
);
export default userRouter;