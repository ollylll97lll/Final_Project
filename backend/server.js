import express from 'express';
import mongoose from 'mongoose';
import data from './sampledata.js'
import userRouters from './routers/userRouters.js';
import productRouters from './routers/productRouters.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/api/carousels', (req,res) =>{
    res.send(data.carouseldata);
})
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouters)
app.use('/api/products', productRouters)
app.use('/api/orders', orderRouter)
// PAYPAL CLIENT ID
app.get('/api/config/paypal', (req,res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

// PAYPAL CLIENT ID
app.get('/api/config/google', (req,res) => {
    res.send(process.env.GOOGLE_API_KEY || '');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, '/frontend/build') ));
app.get('*', (req,res) => res.sendFile(path.join(__dirname, '/frontend/build/index.html') ))

app.get('/', (req,res) =>{
    res.send('sever ready')
})
app.use((err,req,res,next) =>{
    res.status(500).send({message : err.message});
})
mongoose.connect(process.env.URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true
});

const port = process.env.PORT
app.listen(port, () =>{
    console.log('sever listen at http://localhost:' + port); 
})