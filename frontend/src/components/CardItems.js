import { Card } from 'react-bootstrap';
import React from 'react';
import {Link} from 'react-router-dom'


class CardItems extends React.Component {
    render() {
        const href = '/products/' + this.props.id;
        return (

            <div>
                <Link to={href}>
                    <Card className=' border-0'>
                        <Card.Body className='px-0 py-1 mx-auto' >
                            <Card.Img variant="top" src={this.props.image} alt={this.props.name} className='w-100 h-auto' />
                            <Card.Title><h2>{this.props.name}</h2></Card.Title>
                            <Card.Text><span>{this.props.price}</span><sup> &#8363;</sup></Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        );
    }
}
export default CardItems;