import React, { useState } from 'react'
import Button from '../../node_modules/react-bootstrap/esm/Button';
import Form from '../../node_modules/react-bootstrap/esm/Form';
import Row from '../../node_modules/react-bootstrap/esm/Row';

export default function SearchBox(props) {
    const [name, setName] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const showsearch ={
        display: "block"
    }
    const hidesearch ={
        display: "none"
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        props.history.push(`/search/name/${name}`);
    }
    return (
        <div id="search-bar-toggle" style={ isSubmitted ? hidesearch : showsearch}>
            <Form onSubmit={submitHandler}>
                <Row>
                    <Form.Control
                        style={{width: "80%", float:"right",marginRight:"45px", marginLeft:"20%"}}
                        type="text"
                        name="q" id="q"
                        onChange={(e) => setName(e.target.value)}></Form.Control>
                    {/* <!-- SVG THROUGH <SYMBOL> TAG USE --> */}
                    <button type="submit"><svg id="search-icon"> <use xlinkHref="#svg-icon-search-circle" /> </svg> </button>
                </Row>
            </Form>

            <svg display="none">
                <symbol viewBox="0 0 33 33" id="svg-icon-search-circle">
                    <title>search-circle</title>
                    <g id="search-circle-search" fill="currentColor">
                        <path d="M14.90625,19.2484472 C12.75,19.2484472 10.96875,17.3850932 10.96875,15.1490683 C10.96875,12.9130435 12.75,11.0496894 14.90625,11.0496894 C17.0625,11.0496894 18.84375,12.9130435 18.84375,15.1490683 C18.9375,17.3850932 17.15625,19.2484472 14.90625,19.2484472 Z M20.0625,18.3167702 C20.625,17.3850932 20.90625,16.2670807 20.90625,15.1490683 C20.90625,11.7018634 18.28125,9 14.90625,9 C11.625,9 9,11.7018634 9,15.1490683 C9,18.5031056 11.625,21.2981366 14.90625,21.2981366 C16.21875,21.2981366 17.53125,20.8322981 18.46875,20.0869565 L22.3125,24 L24,22.5093168 L20.0625,18.3167702 Z" id="search-circle-search1">
                        </path>
                        <path d="M16.5,0 C7.38644476,0 0,7.38644476 0,16.5 C0,25.6135552 7.38644476,33 16.5,33 C25.6135552,33 33,25.6121856 33,16.5 C33,7.38781439 25.6121856,0 16.5,0 Z M16.5,30.4223458 C8.81086578,30.4223458 2.57765419,24.1905039 2.57765419,16.5 C2.57765419,8.80949614 8.80949614,2.57765419 16.5,2.57765419 C24.1905039,2.57765419 30.4223458,8.80949614 30.4223458,16.5 C30.4223458,24.1905039 24.1891342,30.4223458 16.5,30.4223458 Z" id="search-circle-search2">
                        </path>
                    </g>
                </symbol>
            </svg>
        </div>
    )
}
