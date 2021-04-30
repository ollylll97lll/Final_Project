const sampleimg = '/images/product-img-1.jpg';
const sliderimg = '/images/sample.png';
import bcrypt from 'bcrypt';
const SampleData = {
    carouseldata: [
        {
            _id: '1',
            image: sliderimg,
            caption : "Sample Caption 1"
        },
        {
            _id: '2',
            image: sliderimg,
            caption : "Sample Caption 2"
        },
        {
            _id: '3',
            image: sliderimg,
            caption : "Sample Caption 3"
        }
    ],

    products: [
        {
            image: sampleimg,
            name: 'Product1',
            price: '340000',
            countInStock: 20,
            category: 'bottom',
            description:'...',
            coll3ction: 'f/w 2018'
        },
        {
            image: sampleimg,
            name: 'Product2',
            price: '280000',
            countInStock: 400,
            category: 'top',
            description:'...',
            coll3ction: 'f/w 2018'
        },
        {
            image: sampleimg,
            name: 'Product3',
            price: '170000',
            countInStock: 20,
            category: 'bottom',
            description:'...',
            coll3ction: 'f/w 2018'
        },
        {
            image: sampleimg,
            name: 'Product4',
            price: '580000',
            countInStock: 0,
            category: 'top',
            description:'...',
            coll3ction: 'f/w 2018'
            
        },
        {
            image: sampleimg,
            name: 'Product5',
            price: '980000',
            countInStock: 20,
            category: 'bottom',
            description:'...',
            coll3ction: 'f/w 2018'
        },
        {
            image: sampleimg,
            name: 'Product6',
            price: '1000000',
            countInStock: 400,
            category: 'top',
            description:'...',
            coll3ction: 'f/w 2018'
        },
        {
            image: sampleimg,
            name: 'Product7',
            price: '106000',
            countInStock: 0,
            category: 'bottom',
            description:'...',
            coll3ction: 'f/w 2018'
        },
        {
            image: sampleimg,
            name: 'Product8',
            price: '720000',
            countInStock: 400,
            category: 'top',
            description:'...',
            coll3ction: 'f/w 2018'
        },
        {
            image: sampleimg,
            name: 'Product9',
            price: '189000',
            countInStock: 20,
            category: 'bottom',
            description:'...',
            coll3ction: 'f/w 2018'
        },
        {
            image: sampleimg,
            name: 'Product10',
            price: '257000',
            countInStock: 0,
            category: 'accessories',
            description:'...',
            coll3ction: 'f/w 2018'
        },
    ],

    users: [
        {
            name: 'Anh',
            email: 'admin@not.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Anhnot',
            email: 'admin@yah.com',
            password: bcrypt.hashSync('4321', 8),
            isAdmin: false,
        },
        {
            name: '1232',
            email: '1212@1212.com',
            password: bcrypt.hashSync('1212', 8),
            isAdmin: false,
        }
    ]
}
export default SampleData;