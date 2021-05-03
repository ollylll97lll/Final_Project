import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import productModel from '../models/productM.js';
import sampledata from '../sampledata.js'
import { isAdmin, isAuth } from '../utils.js';

const productRouters = express.Router();

productRouters.get('/', expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const category = req.query.category || '';

    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;

    const order = req.query.order || '';
    
    const nameFilter = name ? {name: {$regex: name, $options:'i' } } : {};
    const categoryFilter = category ? { category } : {};
    // gte : greater than && lte : less than
    const priceFilter = min && max ? {price: {$gte: min, $lte: max}}: {};
    const sortOrder = 
        order === 'lowest' ? {price: 1}
    :   order === 'highest' ? {price: -1}
    :   {_id: -1};

    const products = await productModel.find({...nameFilter, ...categoryFilter, ...priceFilter}).sort(sortOrder);

    res.send(products);
}))

productRouters.get(
    '/cat/categories',
    expressAsyncHandler(async (req, res) => {
      const categories = await productModel.find().distinct('category');
      res.send(categories);
    })
  );


productRouters.get('/seed', expressAsyncHandler(async (req, res) => {
    await productModel.remove({});
    const createProducts = await productModel.insertMany(sampledata.products);
    res.send({ createProducts });
})
);

productRouters.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: 'NO PRODUCT FOUND' })
    }
}))

productRouters.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = new productModel({
        name: 'sample name' + Date.now(),
        image: '/images/product-img-1.jpg',
        price: 180000,
        category: 'accessories',
        countInStock: 120,
        coll3ction: 'S/S 2020',
        description: 'skrt skrt',
    });
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
}))

productRouters.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await productModel.findById(productId);
    if (product) {
            product.name = req.body.name;
            product.image = req.body.image;
            product.price = req.body.price;
            product.category = req.body.category;
            product.countInStock = req.body.countInStock;
            product.coll3ction = req.body.coll3ction;
            product.description = req.body.description; 
            
            const updateProduct = await product.save();
            res.send({
                message: "Product Updated",
                product: updateProduct
            });
    }else{res.status(404).send({message: "Product Not Found To Update"})};
   
}))

productRouters.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    if (product) {
           
            const deleteProduct = await product.remove();
            res.send({
                message: "Product Deleted",
                product: deleteProduct
            });
    }else{res.status(404).send({message: "Product Not Found To Delete"})};
   
}))

export default productRouters;