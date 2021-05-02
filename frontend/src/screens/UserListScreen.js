import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../node_modules/react-bootstrap/esm/Button';
import Table from '../../node_modules/react-bootstrap/esm/Table';
import { listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function UserListScreen() {
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch]);

    return (
        <div>
            <h1>Users</h1>
            {
                loading ? (<LoadingBox />) :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                        (
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>IS ADMIN</th>
                                        <th>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                            <td>
                                                <Button
                                                    type="button"
                                                    size="small"
                                                // onClick={() => {
                                                //     props.history.push(`/order/${order._id}`);
                                                // }}
                                                >Details</Button>

                                                <Button
                                                    type="button"
                                                    size="small"
                                                // onClick={() => {
                                                //     deleteHandler(order)
                                                // }}
                                                >Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )
            }
        </div>
    )
}
