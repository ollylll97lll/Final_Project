import React, { useEffect} from 'react';
import CardItems from '../components/CardItems';
import { Container, Col, Row, Carousel } from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import {listProducts } from '../actions/productActions';
import {listCarousel } from '../actions/carouselActions';

function Home(props) {
    const dispatch = useDispatch();
    // return new state with the list
    const productList = useSelector(state => state.productList);

    const carouselList = useSelector(state => state.carouselList);
    
    const {loading, error, products} = productList;

    const {load, err, carouseldata} = carouselList;
    useEffect(() => {
       dispatch(listProducts());
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(listCarousel());
    }, [dispatch]);



    return (<body>
        {load ? (
            <LoadingBox />
        ) : err ? (
            <MessageBox variant="danger">{error}</MessageBox>) : (
            <header className="grid-layout-container">
                <Carousel className="slidingbanner" fade>
                    {
                        carouseldata.map((carouseldata) => {
                            return (
                                <Carousel.Item key={carouseldata._id} interval={3000}>
                                    <img src={carouseldata.image} alt="lol" />
                                    <div className=" position-absolute top-50 start-50 translate-middle" style={{ zIndex: '1' }}>
                                        <h3>{carouseldata.caption}</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum</p>
                                    </div>
                                </Carousel.Item>
                            );
                        })
                    }
                </Carousel>
            </header>)}

        {loading ? (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>) : (
            <main className="mainitemshowcase">
                <Container>

                    <Row xs={1} sm={2} md={3}>
                        {
                            products.map((products) => {
                                return (
                                    <Col className='mx-auto'><CardItems key={products._id} id={products._id} name={products.name} image={products.image} price={products.price} /></Col>
                                );
                            })
                        }
                    </Row>

                </Container>
            </main>)}
        <footer className="informationfooter"><br />
        </footer>
    </body>
    );
}

export default Home;