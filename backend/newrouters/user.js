import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import newUserModel from '../newmodels/newUserM.js';
import newSampleData from '../newsampledata.js';
import bcrypt from 'bcrypt';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // remove all data
    // commented out after seed
    await newUserModel.deleteMany({});
    const createUsers = await newUserModel.insertMany(newSampleData.users);
    res.send({ createUsers });
})
);

userRouter.post('/login', expressAsyncHandler(async (req, res) => {
    const user = await newUserModel.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                info: user.info,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({ message: 'Invalid Email or Password' });
})
);

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new newUserModel({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        isAdmin: false,
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

// get user info
userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await newUserModel.findById(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User not found' })
    }
}))

// update profile
userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const user = await newUserModel.findById(req.user._id);
        const { address, city, dateofBirth, fullName, ward, district, lat, lng, telNum } = req.body;
        if (user) {
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8);
            }
            // update userinfo
            user.info.fullName = fullName || user.info.fullName;
            user.info.dateofBirth = dateofBirth || user.info.dateofBirth;
            user.info.address = address || user.info.address;
            user.info.city = city || user.info.city;
            user.info.ward = ward || user.info.ward;
            user.info.district = district || user.info.district;
            user.info.lat = lat || user.info.lat;
            user.info.lng = lng || user.info.lng;
            user.info.telNum = telNum || user.info.telNum;
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                info: updatedUser.info,
                token: generateToken(updatedUser),
            });
        }
    })
)
// getAllUsers
userRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const users = await newUserModel.find({});
        res.send(users);
    })
);

// delete account
userRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const user = await newUserModel.findById(req.params.id);
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

// admin update user profiles
userRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await newUserModel.findById(req.params.id);
        if (user) {
            user.email = req.body.email || user.email;
            user.isAdmin = Boolean(req.body.isAdmin);

            const updatedUser = await user.save();
            res.send({ message: 'User Updated', user: updatedUser });
        } else {
            res.status(404).send({ message: 'User Not Found' });
        }
    })
);
export default userRouter;