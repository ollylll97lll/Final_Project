import { Card } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom'


class CardItems extends React.Component {
    render() {
        const currencyformat = new Intl.NumberFormat('vi', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 2
        })
        const href = '/products/' + this.props.id;
        return (

            <div>
                <Link to={href}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ height: '40vh', width: '250px', overflowX: 'hidden', backgroundImage: `url('http://localhost:8888/uploads${this.props.image}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'luminosity' }} />
                        <h2>{this.props.name}</h2>
                        <span>{currencyformat.format(Number(this.props.price) * 1000)}</span>
                    </div>
                </Link>
            </div>
        );
    }
}
export default CardItems;