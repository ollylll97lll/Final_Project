import React, { useEffect, useState } from 'react'
import 'react-bootstrap'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const redirect = props.location.search? props.location.search.split('=')[1]: '/';


    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, loading, error } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and Confirm Password are not match')
        }else
        dispatch(register(name, email, password));
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
                    error && <MessageBox variant = "danger">{error}</MessageBox>
                }
                <Form.Group>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control type="text" id="name" placeholder="Enter name" required onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" id="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" id="confirmPassword" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            <div><label><div>Already have an account ? {' '}
                <Link to={`/login?redirect=${redirect}`}><span>Sign in</span></Link>
            </div></label></div>
        </div>
    )
}
