import express from 'express';
import 'express-async-handler'
import expressAsyncHandler from 'express-async-handler';
import orderModel from '../models/orderModel.js'
import productModel from '../models/productM.js';
import UserModel from '../models/userM.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router();

// get name of users from the user collection and return.
orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {

  const orders = await orderModel.find({}).populate('use', 'name');
  res.send(orders);
}))

orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await UserModel.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await orderModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await productModel.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  }));


// applying the authetication using jwt key
orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
  const orders = await orderModel.find({ user: req.user._id });
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
  if (order) {
    res.send(order);
  } else {
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

orderRouter.delete(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await orderModel.findById(req.params.id);
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
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await orderModel.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      // for cod packages it needs to paid at the delivery day
      order.isPaid = true;
      order.paidAt = Date.now();
      
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default orderRouter;