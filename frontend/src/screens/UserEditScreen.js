import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../node_modules/react-bootstrap/esm/Button';
import Form from '../../node_modules/react-bootstrap/esm/Form'
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
    const userId = props.match.params.id;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            props.history.push('/userlist');
        }
        if (!user) {
            dispatch(detailsUser(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, props.history, successUpdate, user, userId])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    }
    return (
        <div>
            <Form onSubmit={submitHandler} className="mx-auto" style={{ width: "80%", paddingTop: "120px" }} >
                <div><h1>Edit User <h2>{name}</h2></h1></div>
                {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                {loadingUpdate && (<LoadingBox />)}
                {
                    loading ? <LoadingBox />
                        :
                        error ? <MessageBox variant="danger">{error}</MessageBox>
                            : (
                                <>
                                    <Form.Group>
                                        <Form.Label style={{ fontFamily: 'cyclicsans-bold' }}>Name: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="name"
                                            placeholder="Enter name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label style={{ fontFamily: 'cyclicsans-bold' }}>Email: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="email"
                                            placeholder="example@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label style={{ fontFamily: 'cyclicsans-bold' }}>is Admin ?: </Form.Label>
                                        {email === 'admin@admin.com'
                                            ? (<Form.Check
                                                type="checkbox"
                                                id="isAdmin"
                                                checked={isAdmin}
                                                disabled onChange={(e) => setIsAdmin(e.target.value)}
                                            />)
                                            : (<Form.Check
                                                type="checkbox"
                                                id="isAdmin"
                                                checked={isAdmin}
                                                onChange={(e) => setIsAdmin(e.target.value)} />)
                                        }

                                    </Form.Group>

                                    <Button variant="primary" type="submit" style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>Update</Button>
                                </>
                            )
                }
            </Form>

        </div>
    )
}
