import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Checkout from '../components/Checkout';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';


export default function ShippingAddressScreen(props) {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!userInfo) {
        props.history.push('/login');
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [telNum, setTelNum] = useState(shippingAddress.telNum);
    const [address, setAddress] = useState(shippingAddress.address);
    const [ward, setWard] = useState(shippingAddress.ward);
    const [district, setDistrict] = useState(shippingAddress.district);
    const [city, setCity] = useState(shippingAddress.city);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
          saveShippingAddress({ fullName, address, city, telNum, ward, district })
        );
        props.history.push('/payment');
      };

    return (
        <div style={{ padding: "120px 25%" }}>
            <Checkout step1 step2></Checkout>
            <Form onSubmit={submitHandler}>
                <Form.Group >
                    <Form.Label>Full name</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter full name" 
                    id="fullName"
                     value={fullName} 
                     onChange={(e) => setFullName(e.target.value)}
                     required />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Telephone number</Form.Label>
                    <Form.Control 
                    type="number" 
                    placeholder="" 
                    id="telNum" 
                    value={telNum} 
                    onChange={(e) => setTelNum(e.target.value)} 
                    required/>
                </Form.Group>

                <Form.Group >
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter address" 
                    id="address" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required />

                </Form.Group>

                <Form.Group >
                    <Form.Label>Ward</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter Ward" 
                    id="ward" 
                    value={ward} 
                    onChange={(e) => setWard(e.target.value)}  
                    required/>

                </Form.Group>

                <Form.Group >
                    <Form.Label>District</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter district" 
                    id="district" 
                    value={district} 
                    onChange={(e) => setDistrict(e.target.value)} 
                    required/>

                </Form.Group>

                <Form.Group >
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter City" 
                    id="city" 
                    value={city} 
                    onChange={(e) => 
                    setCity(e.target.value)} 
                    required/>

                </Form.Group>

                <Button variant="primary" type="submit" style={{ width: "80%", marginLeft: "10%" }}>PROCEED</Button>
            </Form>
        </div>
    )
}