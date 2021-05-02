import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../node_modules/react-bootstrap/esm/Button';
import Table from '../../node_modules/react-bootstrap/esm/Table';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_DELETE_RESET, USER_DETAILS_RESET } from '../constants/userConstants';

export default function UserListScreen(props) {
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userDelete = useSelector((state) => state.userDelete);
    const { loading: loadingDelete, error : errorDelete, success: successDelete } = userDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers());
        dispatch({type: USER_DETAILS_RESET});
        if(successDelete){
            dispatch({ type: USER_DELETE_RESET });
          }
    }, [dispatch, successDelete]);

    const deleteHandler = (user) => {
        if(window.confirm(`User ${user.name} could not be restored. Are you sure to delete this user ?`)){
            dispatch(deleteUser(user._id)) ;
        }
    }
    return (
        <div style={{marginTop:"120px"}}>
            <h1>Users</h1>
            {loadingDelete && (<LoadingBox/>)}
            {errorDelete && (<MessageBox variant="danger">{errorDelete}</MessageBox>)}
            {successDelete && (<MessageBox variant="success">User Delete Not Failed</MessageBox>)}
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
                                                onClick={() => {
                                                    props.history.push(`/user/${user._id}/edit`);
                                                }}
                                                >Details</Button>

                                                <Button
                                                    type="button"
                                                    size="small"
                                                onClick={() => {
                                                    deleteHandler(user)
                                                }}
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
