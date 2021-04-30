import React, { useEffect, useState } from 'react'
import 'react-bootstrap'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
export default function LoginScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const redirect = props.location.search? props.location.search.split('=')[1]: '/';


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, loading, error } = userLogin;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }
    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    }, [props.history,redirect,userInfo]);
    
    return (
        <div style={{ width: "75%", paddingLeft: "25%", paddingTop: "20%" }}>
            <Form onSubmit={submitHandler}>
                {
                    loading && <LoadingBox></LoadingBox>
                }
                {
                    error && <MessageBox variant = "danger">error</MessageBox>
                }
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" id="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            <div><label><div>New customer? {' '}
                <Link to={`/register?redirect=${redirect}`}><span>Create your Account</span></Link>
            </div></label></div>
        </div>
    )
}
