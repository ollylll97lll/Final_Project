import express from 'express'
import expressAsyncHandler from 'express-async-handler';
// import productModel from '../models/productM.js';
import newProductModel from '../newmodels/newProductM.js';
// import sampledata from '../sampledata.js'
import newSampleData from '../newsampledata.js';
import { isAdmin, isAuth } from '../utils.js';

import fs from 'fs'

const productRouter = express.Router();
const uploadfolderName = './backend/uploaded'

// seed data
productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await newProductModel.remove({});
    const createProducts = await newProductModel.insertMany(newSampleData.products);
    res.send({ createProducts });
})
);
// getall
productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const category = req.query.category || '';

    const coll3ction = req.query.coll3ction || '';

    const pageSize = Number(req.query.pageSize) || 10;
    const page = Number(req.query.pageNumber) || 1;

    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;

    const order = req.query.order || '';

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const coll3ctionFilter = coll3ction ? { coll3ction: { $regex: coll3ction } } : {};
    const categoryFilter = category ? { category } : {};
    // gte : greater than && lte : less than
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const sortOrder =
        order === 'lowest' ? { price: 1 }
            : order === 'highest' ? { price: -1 }
                : { _id: -1 };

    // return matching number of document from the DB
    const count = await newProductModel.countDocuments({ ...nameFilter, ...categoryFilter, ...priceFilter, ...coll3ctionFilter });
    // return all product with the name filter, cat filter, price filter, sorting order, by pages
    const products = await newProductModel.find({ ...nameFilter, ...categoryFilter, ...priceFilter }).sort(sortOrder).skip(pageSize * (page - 1)).limit(pageSize);
    // ceil round up to next largest ex: 8.00001 = 9
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
}))

// getbycategory
productRouter.get(
    '/cat/categories',
    expressAsyncHandler(async (req, res) => {
        const categories = await newProductModel.find().distinct('category');
        res.send(categories);
    })
);
// getbycollection
productRouter.get(
    '/col/collections',
    expressAsyncHandler(async (req, res) => {
        const categories = await newProductModel.find().distinct('coll3ction');
        res.send(categories);
    })
);
productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await newProductModel.findById(req.params.id);
    if (product) {
        // const returnvariants = [];
        // get list of foldername from variants array
        [...product.variants].map((variant, index) => {
            // get list of image links from the foldername
            const imagefolder = variant.imagefolder;
            const files = fs.readdirSync(`${uploadfolderName}${imagefolder}`)
            const returnfilelist = [];

            // push filename into files array
            files.map(file => {
                returnfilelist.push(`${uploadfolderName}/${file}`);
            })
            // 
            const tempvariant = {
                colors: variant.colors,
                _id: variant._id,
                discount: variant.discount,
                amount: variant.amount,
                files: returnfilelist
            }
            return product.variants[index] = tempvariant;
            // returnvariants.push(tempvariant);
        })
        res.send(product);
    } else {
        res.status(404).send({ message: 'NO PRODUCT FOUND' })
    }
}))

// create sample post before edit
productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = new newProductModel({
        name: 'sample name' + Date.now(),
        thumbnailimg: '/images/product-img-1.jpg',
        price: Math.floor(Math.random() * 701),
        category: 'accessories',
        coll3ction: `Sample ${new Date().getFullYear()}`,
        description: 'skrt skrt',
        variants: [
            {
                color: {
                    name: 'default',
                    hexcolor: 'ECE1CF'
                },
                discount: 0,
                imagefolder: '/images',
                ammount: [
                    {
                        size: 'Freesize',
                        countInStock: Math.floor(Math.random() * 101)
                    }
                ]
            }
        ]
    });
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
}))

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await newProductModel.findById(productId);
    const { name, image, price, category, coll3ction, description, variants } = req.body;
    if (product) {
        product.name = name;
        product.thumbnailimg = image;
        product.price = price;
        product.category = String(category).toLowerCase();
        product.coll3ction = coll3ction;
        product.description = description;

        const updateProduct = await product.save();
        // add variants into product
        await newProductModel.findByIdAndUpdate(productId, {
            $push: { variants: { $each: [...variants] } }
        }).then(data => {
            res.send({
                message: "Product Updated",
                product: data
            });
        })

    } else { res.status(404).send({ message: "Product Not Found To Update" }) };

}))

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await newProductModel.findById(req.params.id);
    if (product) {

        const deleteProduct = await product.remove();
        res.send({
            message: "Product Deleted",
            product: deleteProduct
        });
    } else { res.status(404).send({ message: "Product Not Found To Delete" }) };

}))

export default productRouter;