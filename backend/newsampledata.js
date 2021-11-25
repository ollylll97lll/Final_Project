const orand = '/images/orand.jpg';
const orand1 = '/images/orand1.jpg';
const orand2 = '/images/orand2.jpg';

const pastel = '/images/pastel.jpg';
const pastel1 = '/images/pastel1.jpg';

const location = '/images/location.jpg';
const location1 = '/images/location1.jpg';

const collection1 = '/images/orand'
const collection2 = '/images/category2'
const collection3 = '/images/category3'
const collection4 = '/images/category4'

import bcrypt from 'bcrypt';
const newSampleData = {
    carouseldata: [
        {
            _id: '1',
            image: orand,
            caption: "Orand 1"
        },
        {
            _id: '2',
            image: orand1,
            caption: "Orand 2"
        },
        {
            _id: '3',
            image: orand2,
            caption: "Orand 3"
        },
        {
            _id: '4',
            image: pastel,
            caption: "Pastel 1"
        },
        {
            _id: '5',
            image: pastel1,
            caption: "Pastel 2"
        },
        {
            _id: '6',
            image: location,
            caption: "Location 1"
        },
        {
            _id: '7',
            image: location1,
            caption: "Location 2"
        }
    ],

    products: [
        {
            name: 'longpants1',
            coll3ction: 'Orand',
            category: 'bottom',
            description: 'Orand checkered flare pants',
            price: 420,
            thumbnailimg: `${collection1}/bottom/longpants1/grey/thumbnail.jpg`,
            variants: [
                {
                    colors: {
                        name: 'orange',
                        hexcolor: 'DFCBB5'
                    },
                    discount: 5,
                    imagefolder: `${collection1}/bottom/longpants1/orange`,
                    amount: [
                        {
                            size: 'XS',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'S',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'M',
                            countInStock: 0
                        },
                        {
                            size: 'L',
                            countInStock: Math.floor(Math.random() * 101)
                        }
                    ]
                },
                {
                    colors: {
                        name: 'grey',
                        hexcolor: 'B3A797'
                    },
                    discount: 5,
                    imagefolder: `${collection1}/bottom/longpants1/grey`,
                    amount: [
                        {
                            size: 'XS',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'S',
                            countInStock: 0
                        },
                        {
                            size: 'M',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'L',
                            countInStock: Math.floor(Math.random() * 101)
                        }
                    ]
                },
            ]
        },
        {
            name: 'longpants2',
            coll3ction: 'Orand',
            category: 'bottom',
            description: 'Navy Straight Pants',
            price: 420,
            thumbnailimg: `${collection1}/bottom/longpants2/thumbnail.jpg`,
            variants: [
                {
                    colors: {
                        name: 'navy',
                        hexcolor: '1D1E3C'
                    },
                    discount: 0,
                    imagefolder: `${collection1}/bottom/longpants2`,
                    amount: [
                        {
                            size: 'XS',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'S',
                            countInStock: 0
                        },
                        {
                            size: 'M',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'L',
                            countInStock: Math.floor(Math.random() * 101)
                        }
                    ]
                },
            ]
        },
        {
            name: 'longskirt1',
            coll3ction: 'Orand',
            category: 'bottom',
            description: 'Orange Maxi Skirt',
            price: 520,
            thumbnailimg: `${collection1}/bottom/longskirt1/thumbnail.jpg`,
            variants: [
                {
                    colors: {
                        name: 'default',
                        hexcolor: 'EDDCC1'
                    },
                    discount: 0,
                    imagefolder: `${collection1}/bottom/longskirt1`,
                    amount: [
                        {
                            size: 'XS',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'S',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'M',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'L',
                            countInStock: Math.floor(Math.random() * 101)
                        }
                    ]
                },
            ]
        },
        {
            name: 'longskirt2',
            coll3ction: 'Orand',
            category: 'bottom',
            description: 'Orange Midi Skirt',
            price: 450,
            thumbnailimg: `${collection1}/bottom/longskirt2/thumbnail.jpg`,
            variants: [
                {
                    colors: {
                        name: 'orange',
                        hexcolor: 'DF8701'
                    },
                    discount: 0,
                    imagefolder: `${collection1}/bottom/longskirt2`,
                    amount: [
                        {
                            size: 'XS',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'S',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'M',
                            countInStock: 0
                        },
                        {
                            size: 'L',
                            countInStock: Math.floor(Math.random() * 101)
                        }
                    ]
                },
            ]
        },
        {
            name: 'shortskirt1',
            coll3ction: 'Orand',
            category: 'bottom',
            description: 'Orange Skirt',
            price: 350,
            thumbnailimg: `${collection1}/bottom/shortskirt1/thumbnail.jpg`,
            variants: [
                {
                    colors: {
                        name: 'default',
                        hexcolor: 'EDDCC1'
                    },
                    discount: 0,
                    imagefolder: `${collection1}/bottom/shortskirt1`,
                    amount: [
                        {
                            size: 'XS',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'S',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'M',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'L',
                            countInStock: Math.floor(Math.random() * 101)
                        }
                    ]
                },
            ]
        },
        {
            name: 'shortskirt2',
            coll3ction: 'Orand',
            category: 'bottom',
            description: 'Cream Striped Skirt',
            price: 340,
            thumbnailimg: `${collection1}/bottom/shortskirt2/thumbnail.jpg`,
            variants: [
                {
                    colors: {
                        name: 'default',
                        hexcolor: 'B3A797'
                    },
                    discount: 10,
                    imagefolder: `${collection1}/bottom/shortskirt2`,
                    amount: [
                        {
                            size: 'XS',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'S',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'M',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'L',
                            countInStock: Math.floor(Math.random() * 101)
                        }
                    ]
                }
            ]
        },
        {
            name: 'shortskirt3',
            coll3ction: 'Orand',
            category: 'bottom',
            description: 'Beige A Skirt',
            price: 340,
            thumbnailimg: `${collection1}/bottom/shortskirt3/thumbnail.jpg`,
            variants: [
                {
                    colors: {
                        name: 'default',
                        hexcolor: 'BE9F8B'
                    },
                    discount: 5,
                    imagefolder: `${collection1}/bottom/shortskirt3`,
                    amount: [
                        {
                            size: 'XS',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'S',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'M',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'L',
                            countInStock: Math.floor(Math.random() * 101)
                        }
                    ]
                }
            ]
        },
        {
            name: 'jacket1',
            coll3ction: 'Orand',
            category: 'outerwear',
            description: 'Striped Work Jacket',
            price: 470,
            thumbnailimg: `${collection1}/outerwear/jacket1/thumbnail.jpg`,
            variants: [
                {
                    colors: {
                        name: 'default',
                        hexcolor: 'B3A797'
                    },
                    discount: 5,
                    imagefolder: `${collection1}/outerwear/jacket1`,
                    amount: [
                        {
                            size: 'S',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'M',
                            countInStock: Math.floor(Math.random() * 101)
                        }
                    ]
                },
            ]
        },
        {
            name: 'jacket2',
            coll3ction: 'Orand',
            category: 'top',
            description: 'Basic Shirt',
            price: 420,
            thumbnailimg: `${collection1}/outerwear/jacket2/or/thumbnail.jpg`,
            variants: [
                {
                    colors: {
                        name: 'orange',
                        hexcolor: 'DF8701'
                    },
                    discount: 5,
                    imagefolder: `${collection1}/outerwear/jacket2/or`,
                    amount: [
                        {
                            size: 'Freesize',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                    ]
                },
                {
                    colors: {
                        name: 'cream',
                        hexcolor: 'EDDCC1'
                    },
                    discount: 5,
                    imagefolder: `${collection1}/outerwear/jacket2/cream`,
                    amount: [
                        {
                            size: 'Freesize',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                    ]
                },
                {
                    colors: {
                        name: 'navy',
                        hexcolor: '1D1E3C'
                    },
                    discount: 5,
                    imagefolder: `${collection1}/outerwear/jacket2/navy`,
                    amount: [
                        {
                            size: 'Freesize',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                    ]
                }
            ]
        },
        {
            name: 'dress1',
            coll3ction: 'Orand',
            category: 'top',
            description: 'Long Midi Dress',
            price: 720,
            thumbnailimg: `${collection1}/top/dress1/thumbnail.jpg`,
            variants: [
                {
                    colors: {
                        name: 'default',
                        hexcolor: '1D1E3C'
                    },
                    discount: 5,
                    imagefolder: `${collection1}/top/dress1`,
                    amount: [
                        {
                            size: 'XS',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'S',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'M',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'L',
                            countInStock: Math.floor(Math.random() * 101)
                        }
                    ]
                }
            ]
        },
        {
            name: 'dress2',
            coll3ction: 'Orand',
            category: 'top',
            description: 'White Off Shoulder Top & Maxi Skirt',
            price: 870,
            thumbnailimg: `${collection1}/top/dress2/thumbnail.jpg`,
            variants: [
                {
                    colors: {
                        name: 'default',
                        hexcolor: 'DFCBB5'
                    },
                    discount: 5,
                    imagefolder: `${collection1}/top/dress2`,
                    amount: [
                        {
                            size: 'XS',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'S',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'M',
                            countInStock: Math.floor(Math.random() * 101)
                        },
                        {
                            size: 'L',
                            countInStock: Math.floor(Math.random() * 101)
                        }
                    ]
                }
            ]
        },
        {
            name: 'top1',
            coll3ction: 'Orand',
            category: 'top',
            description: 'Orange Off Shoulder Top',
            price: 350,
            thumbnailimg: `${collection1}/top/top1/thumbnail.jpg`,
            variants: [
                {
                    colors: {
                        name: 'default',
                        hexcolor: 'EDDCC1'
                    },
                    discount: 5,
                    imagefolder: `${collection1}/top/top1`,
                    amount: [
                        {
                            size: 'Freesize',
                            countInStock: Math.floor(Math.random() * 101)
                        }
                    ]
                }
            ]
        },
        {
            name: 'top2',
            coll3ction: 'Orand',
            category: 'top',
            description: 'Neon Orange Fitted Top',
            price: 320,
            thumbnailimg: `${collection1}/top/top2/thumbnail.jpg`,
            variants: [
                {
                    colors: {
                        name: 'default',
                        hexcolor: 'DF8701'
                    },
                    discount: 5,
                    imagefolder: `${collection1}/top/top2`,
                    amount: [
                        {
                            size: 'Freesize',
                            countInStock: Math.floor(Math.random() * 101)
                        }
                    ]
                }
            ]
        },
        {
            name: 'top3',
            coll3ction: 'Orand',
            category: 'top',
            description: 'Orange Square Neck Top',
            price: 320,
            thumbnailimg: `${collection1}/top/top3/thumbnail.jpg`,
            variants: [
                {
                    colors: {
                        name: 'default',
                        hexcolor: 'DF8701'
                    },
                    discount: 5,
                    imagefolder: `${collection1}/top/top3`,
                    amount: [
                        {
                            size: 'Freesize',
                            countInStock: Math.floor(Math.random() * 101)
                        }
                    ]
                }
            ]
        },
    ],

    users: [
        {
            email: 'admin@admin.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            email: 'user@user.com',
            password: bcrypt.hashSync('user', 8),
            isAdmin: false,
        },
    ]
}
export default newSampleData;