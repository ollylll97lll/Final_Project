import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, NavLink, Row } from 'react-bootstrap';
import '../css/productscreen.css'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const [qty, setQty] = useState(1);

    const addToCartHandle = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`); 
    }
    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);
    return (<div>
        {loading ? (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <Container fluid>
                <NavLink href="/">Return to results</NavLink>
                <Row>
                    <Col md={12} lg={6}><Card>
                        <Card.Body>
                            <Card.Img src={product.image} alt={product.name} rounded></Card.Img>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col md={12} lg={3}>
                        <Card>
                            <Card.Body>
                                <ul>
                                    <li><h1 style={{ fontSize: "2rem" }}>{product.name}</h1></li>
                                    <li><b>Price:</b> {product.price} <sup> &#8363;</sup></li>
                                    <li><b>Description:</b> <p>{product.description}</p></li>
                                </ul>
                            </Card.Body>
                        </Card>

                    </Col>
                    <Col md={12} lg={3}>
                        <Card className="checkout">
                            <Card.Body>
                                <ul>
                                    <li><Row>
                                        <div><b>Total Price</b></div>
                                        <div><h1>{product.price} <sup> &#8363;</sup></h1></div>
                                    </Row></li>
                                    <li><Row>
                                        <div><b>Status</b></div>
                                        <div>
                                            <h1>
                                                {
                                                    product.countInStock > 0 ?
                                                        (<span >In Stock</span>) :
                                                        (<span style={{ color: "red" }}>Unavailable</span>)
                                                }
                                            </h1>
                                        </div>
                                    </Row></li>
                                    {
                                        product.countInStock > 0 && (
                                            <>
                                                <li><Row>
                                                    <div>Quantity:</div>
                                                    <div>
                                                        <select value={qty} onChange={e => setQty(e.target.value)}>
                                                            {
                                                                // Array start with 0 so add 1
                                                                [...Array(product.countInStock).keys()].map(
                                                                    (x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                            }
                                                        </select>
                                                    </div>
                                                </Row></li>
                                            </>
                                        )
                                    }
                                    <li><Button onClick={addToCartHandle} primary block>Add to Cart</Button></li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col><Card>
                        <Card.Body>
                            <Row className='product-details'>
                                <div><h3>Product Details :</h3></div>
                                <div>
                                    <ul>
                                        <li>Category</li>
                                        <li>pattern</li>
                                        <li>Matterial</li>
                                    </ul>
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