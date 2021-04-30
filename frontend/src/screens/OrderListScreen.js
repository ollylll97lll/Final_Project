import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../node_modules/react-bootstrap/esm/Button';
import Table from '../../node_modules/react-bootstrap/esm/Table';
import { listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderListScreen(props) {
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;
    const dispatch = useDispatch('')
    useEffect(() => {
        dispatch(listOrders());
    }, [dispatch]);

    const deleteHandler = (order) => {

    }
    return (
        <div style={{ marginTop: "120px" }}>
            <h1>Orders</h1>
            {loading ? <LoadingBox /> :
                error ? <MessageBox variant="danger">{error}</MessageBox> :
                    (
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>CUSTOMER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                        <td>
                                            {order.isDelivered
                                                ? order.deliveredAt.substring(0, 10)
                                                : 'No'}
                                        </td>
                                        <td>
                                            <Button
                                                type="button"
                                                size="small"
                                                onClick={() => {
                                                    props.history.push(`/order/${order._id}`);
                                                }}
                                            >Details</Button>

                                            <Button
                                                type="button"
                                                size="small"
                                                onClick={() => {
                                                    deleteHandler(order)
                                                }}
                                            >Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}

        </div>
    )
}
