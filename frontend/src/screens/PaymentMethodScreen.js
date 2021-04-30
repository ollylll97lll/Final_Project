import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import Checkout from '../components/Checkout'

export default function PaymentMethodScreen(props) {
    // get the data from Redux cart get the shippingAdress dataset in the prev page
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    // if there is no such data then redirect back to the shipping page
    if(!shippingAddress.address) {
        props.history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <div style={{ padding: "120px 25%" }}>
            <Checkout step1 step2 step3></Checkout>
            <Form onSubmit={submitHandler}>
               <Form.Check 
               type="radio" 
               id="paypal" 
               value="PayPal" 
               name="paymentMethod" 
               required 
               checked 
               onChange={(e) => setPaymentMethod(e.target.value)}
               label="PayPal method"/>
               <Form.Check 
               type="radio"
                id="cod" 
                value="cod" 
                name="paymentMethod" 
                required 
                onChange={(e) => setPaymentMethod(e.target.value)}
                label="Cash on Delivery (COD)"/>
            <Button variant="primary" type="submit"> Continue </Button>
            </Form>
        </div>
    )
}
