import React, { useEffect } from 'react';
import CardItems from '../components/CardItems';
import { Container, Col, Row, Carousel, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { listProducts } from '../actions/productActions';
import { listCarousel } from '../actions/carouselActions';
// import { } from 'bootstrap';

function Home(props) {
    const dispatch = useDispatch();
    // return new state with the list
    const productList = useSelector(state => state.productList);

    const carouselList = useSelector(state => state.carouselList);

    const { loading, error, products } = productList;

    const { load, err, carouseldata } = carouselList;
    useEffect(() => {
        dispatch(listProducts({ pageSize: 8, coll3ction:'dd' }));
        dispatch(listCarousel());
    }, [dispatch]);


    return (<>
        {load ? (
            <LoadingBox />
        ) : err ? (
            <MessageBox variant="danger">{error}</MessageBox>) : (
            <Carousel className="slidingbanner" slide>
                {
                    carouseldata.map((carouseldata) => {
                        return (
                            <Carousel.Item key={carouseldata._id} interval={3000}>
                                <div
                                    style={{
                                        height: '80vh', display: 'flex', overflow: 'hidden',
                                        backgroundImage: `url('http://localhost:8888/uploads${`${carouseldata.image}`}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'luminosity'
                                    }} >
                                    <span style={{ fontSize: '5rem', alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100%', fontFamily: 'cyclicsans-bold', color: `${carouseldata.color}` }}>{carouseldata.caption}</span>
                                    <Carousel.Caption>
                                        <span style={{ display: 'block', fontSize: '2rem' }}>{carouseldata.description}</span>
                                        {carouseldata.isButton && (
                                            <Button variant={carouseldata.isDark == false ? "outline-light" : "outline-dark"} size="lg" >Buy now</Button>
                                        )}
                                    </Carousel.Caption>
                                </div>
                            </Carousel.Item>
                        );
                    })
                }
            </Carousel>
        )}
        <main className="mainitemshowcase">
            <Container fluid>
                <h2>Latest Collections:</h2>
                {loading ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>) : (

                    <Row xs={1} sm={2} md={3} xl={4}>
                        {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                        {
                            products.map((product) => {
                                return (
                                    <Col className='mx-0'><CardItems key={product._id} id={product._id} name={product.name} image={`${product.thumbnailimg}`} price={product.price} /></Col>
                                );
                            })
                        }
                    </Row>

                )}
            </Container>
        </main>
        <footer className="informationfooter"><br />
        </footer>
    </>
    );
}

export default Home;