import express from 'express';
import 'express-async-handler'
import expressAsyncHandler from 'express-async-handler';
import newOrderModel from '../newmodels/newOrderM.js';

import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router();

// get all orders.
orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const orders = await newOrderModel.find({})
    // .populate('use', 'name');
    res.send(orders);
}))

// get user orders
orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await newOrderModel.find({ user: req.user._id });
    res.send(orders);
}))

// create new order
orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.lenght === 0) {
        res.status(400).send({ message: 'Cart is empty' });
    } else {
        const order = new newOrderModel({
            orderItems: req.body.orderItems,

            shippingInfo: req.user.info || req.body.shippingInfo,
            paymentMethod: String(req.body.paymentMethod).toLowerCase(),
            // total item price
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
// get order info
orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await newOrderModel.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Order not found' });
    }
})
);

// update payment
orderRouter.put(
    '/:id/paid',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await newOrderModel.findById(req.params.id);
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

// delete order
orderRouter.delete(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await newOrderModel.findById(req.params.id);
        if (order) {
            const deleteOrder = await order.remove();
            res.send({ message: 'Order Deleted', order: deleteOrder });

        }
        else {
            res.status(404).send({ message: 'Order Not Found to Delete' });
        }
    })
);

orderRouter.put(
    '/:id/delivered',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const order = await newOrderModel.findById(req.params.id);
        if (order) {
            order.isDelivered = true;
            // for cod packages it needs to paid at the delivery day
            order.isPaid = true;
            if (order.paymentMethod == 'cod') {
                order.paidAt = Date.now();
            }

            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.send({ message: 'Order Delivered', order: updatedOrder });
        } else {
            res.status(404).send({ message: 'Order Not Found' });
        }
    })
);

export default orderRouter;