import http from 'http'
import { Server } from 'socket.io'
import express from 'express';
import mongoose from 'mongoose';
// import data from './sampledata.js'
import newSampleData from './newsampledata.js';
// import userRouters from './routers/userRouters.js';
// import productRouters from './routers/productRouters.js';
import dotenv from 'dotenv';
// import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';

import userRouter from './newrouters/user.js';
import productRouter from './newrouters/product.js'
import statisticRouter from './newrouters/statistic.js'
import orderRouter from './newrouters/order.js'
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/api/carousels', (req, res) => {
    res.send(data.carouseldata);
})
app.use('/api/uploads', uploadRouter);
// app.use('/api/users', userRouters)
// app.use('/api/products', productRouters)
// app.use('/api/orders', orderRouter)

// NEW ROUTES
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/statistic', statisticRouter)
app.use('/api/orders', orderRouter)


// PAYPAL CLIENT ID
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// PAYPAL CLIENT ID
app.get('/api/config/google', (req, res) => {
    res.send(process.env.GOOGLE_API_KEY || '');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/frontend/build/index.html')))

app.get('/', (req, res) => {
    res.send('sever ready')
})
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})
mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const port = process.env.PORT

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = [];

io.on('connection', (socket) => {
    console.log('connection', socket.id);
    socket.on('disconnect', () => {
        const user = users.find((x) => x.socketId === socket.id);
        // if exist change status to offline
        // check if admin online if true send noti to admin
        if (user) {
            user.online = false;
            console.log('Offline', user.name);
            const admin = users.find((x) => x.isAdmin && x.online);
            if (admin) {
                io.to(admin.socketId).emit('updateUser', user);
            }
        }
    });
    socket.on('onLogin', (user) => {
        const updatedUser = {
            ...user,
            online: true,
            socketId: socket.id,
            messages: [],
        };
        // check if user in the socket
        // if not then add
        const existUser = users.find((x) => x._id === updatedUser._id);
        if (existUser) {
            existUser.socketId = socket.id;
            existUser.online = true;
        } else {
            users.push(updatedUser);
        }
        console.log('Online', user.name);
        // again check if admin online then send noti
        const admin = users.find((x) => x.isAdmin && x.online);
        if (admin) {
            io.to(admin.socketId).emit('updateUser', updatedUser);
        }
        // if the update user / login user is Admin
        if (updatedUser.isAdmin) {
            io.to(updatedUser.socketId).emit('listUsers', users);
        }
    });

    socket.on('onUserSelected', (user) => {
        const admin = users.find((x) => x.isAdmin && x.online);
        if (admin) {
            const existUser = users.find((x) => x._id === user._id);
            io.to(admin.socketId).emit('selectUser', existUser);
        }
    });

    socket.on('onMessage', (message) => {
        // if message from admin check if user online if true
        // send the message
        // push into message history array
        if (message.isAdmin) {
            const user = users.find((x) => x._id === message._id && x.online);
            if (user) {
                io.to(user.socketId).emit('message', message);
                user.messages.push(message);
            }
        }
        // if message not from admin
        else {
            // find admin & check if online
            // send the message
            // get the user sent the message
            // push into message history array
            const admin = users.find((x) => x.isAdmin && x.online);
            if (admin) {
                io.to(admin.socketId).emit('message', message);
                const user = users.find((x) => x._id === message._id && x.online);
                user.messages.push(message);
            }
            // if admin not online
            else {
                io.to(socket.id).emit('message', {
                    name: 'Admin',
                    body: 'Sorry. I am not online right now',
                });
            }
        }
    });
});


httpServer.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});