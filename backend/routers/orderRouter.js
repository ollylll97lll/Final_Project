import express from 'express';
import 'express-async-handler'
import expressAsyncHandler from 'express-async-handler';
import orderModel from '../models/orderModel.js'
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

// applying the authetication using jwt key
orderRouter.get('/mine',isAuth, expressAsyncHandler(async ( req, res) =>{
  const orders = await orderModel.find({user: req.user._id});
  res.send(orders);
}))

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.lenght === 0) {
        res.status(400).send({ message: 'Cart is empty' });
    } else {
        const order = new orderModel({
            orderItems: req.body.orderItems,

            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,

            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const createOrder = await order.save();
        res.status(201).send({ message: 'New Order Created', order: createOrder });
    }
})
);
orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await orderModel.findById(req.params.id);
    if(order){
        res.send(order);
    }else {
        res.status(404).send({ message: 'Order not found' });
    }
})
);

orderRouter.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await orderModel.findById(req.params.id);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.email_address,
        };
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder });
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );
  
export default orderRouter;