import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import axios from 'axios';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';
import Button from '../../node_modules/react-bootstrap/esm/Button';


export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const {
        loading: loadingPay,
        error: errorPay,
        success: successPay,
    } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {
        loading: loadingDeliver,
        error: errorDeliver,
        success: successDeliver,
    } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order || successPay || successDeliver || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(detailsOrder(orderId));
        } else {
            // if order no paid or there are no paypal window to pay then add paypal script
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true)
                }
            }
        }
    }, [dispatch, orderId, order, sdkReady, successPay, successDeliver]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };
    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
    }
    return loading ? (<LoadingBox />) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
        <div>
            <Container>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col><ul>
                        {/* SHIPPING ADDRESS */}
                        <li>
                            <Card>
                                <Card.Body>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name:</strong> {order.shippingAddress.fullName}<br />
                                        <strong>Telephone num:</strong> {order.shippingAddress.telNum}<br />
                                        <strong>Address:</strong> {order.shippingAddress.address},{order.shippingAddress.ward},{order.shippingAddress.district},{order.shippingAddress.city}
                                    </p>{order.isDelivered ? <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox> :
                                        <MessageBox variant="danger">Not Yet</MessageBox>}
                                </Card.Body>
                            </Card>
                        </li>
                        {/* PAYMENT */}
                        <li>
                            <Card>
                                <Card.Body>
                                    <h2>Payment</h2>
                                    <p>
                                        <strong>Method:</strong> {order.paymentMethod}<br />
                                    </p>
                                    {order.isPaid ? <MessageBox variant="sucess">Paid at {order.paidAt}</MessageBox> :
                                        <MessageBox variant="danger">Not Paid</MessageBox>}
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
                                            order.orderItems.map((item) => {
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
                                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
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
                                            <div><strong>Items Price:</strong> &nbsp;</div>
                                            <div> {order.itemsPrice}<sup>&#8363;</sup></div>
                                        </Row>
                                    </li>
                                    <li>
                                        <Row>
                                            <div><strong>Shipping: </strong>  &nbsp;</div>
                                            <div> {order.shippingPrice}<sup>&#8363;</sup></div>
                                        </Row>
                                    </li>
                                    <li>
                                        <Row>
                                            <div><strong>Tax: </strong>  &nbsp;</div>
                                            <div> {order.taxPrice}<sup>&#8363;</sup></div>
                                        </Row>
                                    </li>
                                    <li>
                                        <Row>
                                            <div><strong>Order Total: </strong>  &nbsp;</div>
                                            <div> {order.totalPrice}<sup>&#8363;</sup></div>
                                        </Row>
                                    </li>
                                    {
                                        order.paymentMethod === 'cod' ?
                                            (<span>COD method</span>) :

                                            !order.isPaid && (
                                                <li>
                                                    {!sdkReady ? (<LoadingBox></LoadingBox>) :
                                                        (
                                                            <>{errorPay && (<MessageBox variant="danger">{errorPay}</MessageBox>)}
                                                                {loadingPay && <LoadingBox />}
                                                                <PayPalButton amount={(order.totalPrice)}
                                                                    onSuccess={successPaymentHandler}></PayPalButton></>
                                                        )}
                                                </li>
                                            )
                                    }
                                    {/* check whether the user is Admin, the order is paid and not delivered, then render this component */}
                                    {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                        <li>
                                            {loadingDeliver && <LoadingBox></LoadingBox>}
                                            {errorDeliver && (
                                                <MessageBox variant="danger">{errorDeliver}</MessageBox>
                                            )}
                                            <Button onClick={deliverHandler}>
                                                Order Delivered
                                            </Button>
                                        </li>
                                    )}
                                    {
                                       userInfo.isAdmin && order.paymentMethod === "cod" && !order.isDelivered && (
                                            <li>
                                            {loadingDeliver && <LoadingBox></LoadingBox>}
                                            {errorDeliver && (
                                                <MessageBox variant="danger">{errorDeliver}</MessageBox>
                                            )}
                                            <Button onClick={deliverHandler}>
                                                Order Delivered
                                            </Button>
                                        </li>
                                        )
                                    }
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}
