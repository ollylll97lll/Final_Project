import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderHistoryScreen(props) {
    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listOrderMine());
    }, [dispatch])
    return (
        <div style={{marginTop:"120px"}}>
            <h1>Order History</h1>
            {loading ? <LoadingBox /> :
                error ? <MessageBox variant="danger">{error}</MessageBox> :
                    (
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>ID</th>
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
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}

        </div>
    )
}
