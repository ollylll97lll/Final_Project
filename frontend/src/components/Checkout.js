import React from 'react'
import { Row } from 'react-bootstrap'

export default function Checkout(props) {
    return (
        <Row className="checkout-steps">
            <div className={props.step1 ? 'active': ''}>Login</div>
            <div className={props.step2 ? 'active': ''}>Shopping</div>
            <div className={props.step3 ? 'active': ''}>Payment</div>
            <div className={props.step4 ? 'active': ''}>Order</div>
        </Row>
    )
}
