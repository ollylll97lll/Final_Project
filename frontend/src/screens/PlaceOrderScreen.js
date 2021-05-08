import React, { useEffect } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import Checkout from '../components/Checkout'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';


export default function PlaceOrderScreen(props) {
    // do not have payment method store in redux => redirect to payment
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 50000 ? toPrice(0) : toPrice(10000);
    cart.taxPrice = toPrice(0.005 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;


    // {...cart} get all cart items
    // set orderItems to be cartItems in the cart
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };
    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);
    return (
        <div  style={{marginTop:'120px'}}>
            <Checkout step1 step2 step3 step4></Checkout>
            <Container>
                <Row>
                    <Col><ul>
                        {/* SHIPPING ADDRESS */}
                        <li>
                            <Card>
                                <Card.Body>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name:</strong> {cart.shippingAddress.fullName}<br />
                                        <strong>Telephone num:</strong> {cart.shippingAddress.telNum}<br />
                                        <strong>Address:</strong> {cart.shippingAddress.address},{cart.shippingAddress.ward},{cart.shippingAddress.district},{cart.shippingAddress.city}
                                    </p>
                                </Card.Body>
                            </Card>
                        </li>
                        {/* PAYMENT */}
                        <li>
                            <Card>
                                <Card.Body>
                                    <h2>Payment</h2>
                                    <p>
                                        <strong>Method:</strong> {cart.paymentMethod}<br />
                                    </p>
                                </Card.Body>
                            </Card>
                        </li>
                        {/* ORDER ITEM */}
                        <li>
                            <Card>
                                <Card.Body>
                                    <h2>Order Items</h2>
                                    <ul>
                                        {
                                            cart.cartItems.map((item) => {
                                                return (
                                                    <li key={item.product}>
                                                        <Row className="cart-items">
                                                            <div >
                                                                {/* IMG */}
                                                                <img src={item.image}
                                                                    alt={item.name}
                                                                    className="small" />
                                                            </div>
                                                            <div className="min-30">
                                                                {/* NAME */}
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </div>

                                                            <div >
                                                                {/* PRICE */}
                                                                {item.qty} x {item.price}<sup>&#8363;</sup>  = {item.qty * item.price}<sup>&#8363;</sup>
                                                            </div>
                                                        </Row>
                                                    </li>
                                                )

                                            })
                                        }
                                    </ul>
                                </Card.Body>
                            </Card>
                        </li>

                    </ul></Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <ul>
                                    <li><h2>Order Summary:</h2></li>
                                    <li>
                                        <Row>
                                            <div><strong>Items Price</strong></div>
                                            <div>{cart.itemsPrice}<sup>&#8363;</sup></div>
                                        </Row>
                                    </li>
                                    <li>
                                        <Row>
                                            <div><strong>Shipping</strong></div>
                                            <div>{cart.shippingPrice}<sup>&#8363;</sup></div>
                                        </Row>
                                    </li>
                                    <li>
                                        <Row>
                                            <div><strong>Tax</strong></div>
                                            <div>{cart.taxPrice}<sup>&#8363;</sup></div>
                                        </Row>
                                    </li>
                                    <li>
                                        <Row>
                                            <div><strong>Order Total:</strong></div>
                                            <div>{cart.totalPrice}<sup>&#8363;</sup></div>
                                        </Row>
                                    </li>
                                    <li>
                                        <Button style={{ width: '100%' }} variant="primary" onClick={placeOrderHandler} className="primary block" disabled={cart.cartItems.length === 0}>Place Order</Button>
                                        {
                                            loading && <LoadingBox />
                                        }
                                        {
                                            error && <MessageBox variant="danger">{error}</MessageBox>
                                        }
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}
