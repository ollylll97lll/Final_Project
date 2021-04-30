
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdateProfile;

    const dispatch = useDispatch()

    // when data send from be to the user
    // reload and set
    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET })
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
        if (password !== confirmPassword) {
          alert('Password and Confirm Password Are Not Matched');
        } else {
          dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
      };
    return (
        <div style={{ width: "75%", paddingLeft: "25%", paddingTop: "120px" }}>
            <Form onSubmit={submitHandler}>
                {
                    loading ? <LoadingBox></LoadingBox>
                        :
                        error ? <MessageBox variant="danger">{error}</MessageBox>
                            : (
                                <>
                                    {loadingUpdate && <LoadingBox></LoadingBox>}
                                    {errorUpdate && (
                                        <MessageBox variant="danger">{errorUpdate}</MessageBox>
                                    )}
                                    {successUpdate && (
                                        <MessageBox variant="success">
                                            Profile Updated Successfully
                                        </MessageBox>
                                    )}
                                    <Form.Group>
                                        <Form.Label>Name: </Form.Label>
                                        <Form.Control type="text" id="name" placeholder="Enter name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" id="email" placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" id="password" placeholder="Password"

                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type="password" id="confirmPassword" placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit">Update</Button>
                                </>)
                }

            </Form>
        </div>
    )
}
