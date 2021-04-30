import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import 'react-bootstrap';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';

export default function CartScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }
    const checkoutHandler = () => {
        props.history.push('/login?redirect=shipping');
    }
    return (
        <Container className="cartscreen" fluid>
            <Row>
                <Col md={8}>
                    <h1>Checkout:</h1>
                    {cartItems.length === 0 ?
                        (<MessageBox>
                            Cart is empty.<Link to="/"> Go and add some items</Link></MessageBox>) : (
                            <ul>
                                {
                                    cartItems.map((item) => {
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
                                                        {/* QUANTITY */}
                                                        <select
                                                            value={item.qty}
                                                            onChange={(e) =>
                                                                dispatch(
                                                                    addToCart(item.product, Number(e.target.value))
                                                                )
                                                            }
                                                        >
                                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div >
                                                        {/* PRICE */}
                                                        {item.price}<sup>&#8363;</sup>
                                                    </div>
                                                    <div >
                                                        {/* DELETE */}
                                                        <button type="button"
                                                            onClick={() => removeFromCartHandler(item.product)}><Link to="/cart">Delete</Link></button>
                                                    </div>
                                                </Row>
                                            </li>
                                        )

                                    })
                                }
                            </ul>
                        )
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ul><li>
                                <h2>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                                    <sup> &#8363;</sup> </h2>
                            </li>
                                <li>
                                    <Button type="button" onClick={checkoutHandler} variant="primary" disabled={cartItems.length === 0}>Proceed to Checkout</Button>

                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
