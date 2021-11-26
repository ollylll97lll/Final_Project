import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, NavLink, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';
import { disable } from 'debug';

function ProductScreen(props) {

    const currencyformat = new Intl.NumberFormat('vi', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 2
    })

    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const [qty, setQty] = useState(1);

    // set item color & size
    const [itemColor, setItemColor] = useState('');
    // image files based on selected color
    const [itemImages, setItemImages] = useState([]);
    const [itemSize, setItemSize] = useState([]);
    const [itemCountInStock, setItemCountInStock] = useState(0);
    // set thumbnailimage
    const [itemThumbnail, setItemThumbnail] = useState('')
    // size selected => render countinstock
    const [sizeSelected, setSizeSelected] = useState(false);
    const addToCartHandle = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }

    function handleColorPicker(e, v) {
        setItemColor(v.colors.name);
        setItemSize(v.amount);
        setItemImages(v.files)
        setItemThumbnail(v.files[0])

        // reset size
        setItemCountInStock(0);
        setSizeSelected(false);
    }
    function handleSizePicker(e, i) {
        setItemCountInStock(i.countInStock);
        setSizeSelected(true);
    }
    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    useEffect(() => {
        if (product) {
            setItemThumbnail(product?.thumbnailimg)
        }
        else return
    }, [product])
    return (
        <div style={{ paddingTop: '120px' }}>
            {loading ? (
                <LoadingBox />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <Container fluid>
                    <NavLink href="/"> <span style={{ fontSize: '1.5rem' }}>Return to results</span> </NavLink>
                    <Row>
                        <Col md={12} lg={6}>
                            <Card>
                                <Card.Body>
                                    {
                                        itemThumbnail && (<Card.Img src={`http://localhost:8888/uploads${itemThumbnail}`} alt={product.name} rounded></Card.Img>)
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={12} lg={6}>
                            <Card>
                                {/* <Card.Body> */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px' }}>
                                    {
                                        [...product.variants].map(variant => {
                                            return (
                                                <ul style={{ padding: 0, margin: 0 }} className={'color-size-inline'}>
                                                    <li>
                                                        <div title={variant.colors.name} style={{ width: '30px', height: '30px', borderRadius: '30px', backgroundColor: `#${variant.colors.hexcolor}` }} onClick={(e, v = variant) => { handleColorPicker(e, v) }} />
                                                    </li>
                                                </ul>
                                            )
                                        })
                                    }
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px', borderTop: '1px lightgray solid', overflowY: 'hidden', scrollbarWidth: 'none' }}>
                                    {
                                        itemImages.length > 0 && (
                                            itemImages.map(image => {
                                                return (
                                                    <ul style={{ padding: 0, margin: 0 }} className={'color-size-inline'}>
                                                        <li>
                                                            <img src={`http://localhost:8888/uploads${image}`} width={'100px'} height={'100px'} onClick={(e, i = image) => { setItemThumbnail(image) }} />
                                                        </li>
                                                    </ul>
                                                )
                                            })
                                        )
                                        // console.log(itemImages))
                                    }
                                </div>
                                {
                                    itemSize.length > 0 && (
                                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'start', height: 'auto', borderTop: '1px solid black', padding: '10px 20px' }}>
                                            {
                                                [...itemSize].map(info => {
                                                    return (<>
                                                        <span style={{ display: 'inline' }}>Size:</span>
                                                        <ul style={{ padding: 0, margin: 0 }} className={'color-size-inline'}>
                                                            <li>
                                                                <div
                                                                    title={info.size}
                                                                    onClick={(e, i = info) => { handleSizePicker(e, i) }}
                                                                    style={{ width: '30px', height: '30px', border: '1px black solid', borderRadius: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className={'size-hover'}>
                                                                    <span>{String(info.size).toLowerCase() == 'freesize' ? 'FS' : info.size}</span>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </>)
                                                })
                                            }
                                        </div>
                                    )
                                }
                                {/* </Card.Body> */}
                            </Card>

                            <Card>
                                <Card.Body>
                                    <ul>
                                        <li><h1 style={{ fontSize: "2rem" }}>{product.name}</h1></li>
                                        <li><b>Price:</b> {currencyformat.format(Number(product.price) * 1000)}</li>
                                        <li><b>Description:</b> <p>{product.description}</p></li>
                                    </ul>
                                </Card.Body>
                            </Card>

                            <Card className="checkout">
                                <Card.Body>
                                    <ul>
                                        <li><Row>
                                            <div><b>Total Price</b></div>
                                            <div><h1>{currencyformat.format(Number(product.price) * 1000 * qty)} <sup> &#8363;</sup></h1></div>
                                        </Row></li>
                                        <li><Row>
                                            <div><b>Status</b></div>
                                            <div>
                                                <h1>
                                                    {
                                                        sizeSelected ? itemCountInStock > 0 ?
                                                            (<span > In Stock</span>) :
                                                            (<span style={{ color: "red" }}> Unavailable</span>) : (<></>)
                                                    }
                                                </h1>
                                            </div>
                                        </Row></li>
                                        {
                                            itemCountInStock > 0 && (
                                                <>
                                                    <li><Row>
                                                        <div style={{ display: 'block', width: '100%' }}>Quantity:</div>
                                                        <div style={{ border: '1px black solid', borderRadius: '10px', width: '75%' }}>
                                                            <input
                                                                type="number"
                                                                style={{ width: '100%', height: '10px' }}
                                                                id="qty"
                                                                min={0}
                                                                max={itemCountInStock}
                                                                step={1}
                                                                value={qty}
                                                                onChange={(e) => { e.target.value > itemCountInStock ? console.log('OverQuantity') : setQty(e.target.value) }}
                                                            />
                                                        </div>
                                                    </Row></li>
                                                </>
                                            )
                                        }
                                        <br />
                                        <li>
                                            {
                                                itemCountInStock > 0 ?
                                                    (<Button onClick={addToCartHandle} variant="primary" block>Add to Cart</Button>) :
                                                    (<Button variant="secondary" block disabled>No Item to Add</Button>)
                                            }
                                        </li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>


                    </Row>
                    <Row>
                        <Col><Card>
                            <Card.Body>
                                <Row className='product-details'>
                                    <div style={{ display: 'block', width: '100%' }}><h3>Product Details :</h3></div>
                                    <br />
                                    <div style={{ paddingTop: '20px' }}>
                                        <span style={{ fontSize: '1.5rem' }}>{product.details}</span>
                                    </div>
                                </Row>
                            </Card.Body>
                        </Card></Col>
                    </Row>
                </Container>)}
        </div>
    );
};

export default ProductScreen;