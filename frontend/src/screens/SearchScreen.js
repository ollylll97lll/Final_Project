import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Col from '../../node_modules/react-bootstrap/esm/Col';
import Row from '../../node_modules/react-bootstrap/esm/Row';
import { listProducts } from '../actions/productActions';
import CardItems from '../components/CardItems';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SearchScreen(props) {
    const { name = 'all', category = 'all' } = useParams();
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = productCategoryList;

    useEffect(() => {
        dispatch(
            listProducts({
                name: name !== 'all' ? name : '',
                category: category !== 'all' ? category : '',
            })
        );
    }, [category, dispatch, name]);

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        return `/search/category/${filterCategory}/name/${filterName}`;
    };
    return (
        <div style={{ marginTop: "120px" }}>
            <Row fluid>
                {
                    loading ? (<LoadingBox />)
                        : error ? (<MessageBox variant="danger">{error}</MessageBox>)
                            : (
                                <div>
                                    {products.length} Results found.
                                </div>
                            )
                }
            </Row>
            <Row fluid>
                <Col md={12} lg={1}>
                    <h3>Department</h3>

                    {loadingCategories ? (
                        <LoadingBox></LoadingBox>
                    ) : errorCategories ? (
                        <MessageBox variant="danger">{errorCategories}</MessageBox>
                    ) : (
                        <ul>
                            {categories.map((c) => (
                                <li key={c}>
                                    <Link
                                        className={c === category ? 'active' : ''}
                                        to={getFilterUrl({ category: c })}
                                    >
                                        {c}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                </Col>
                <Col md={12} lg={8} className="mx-auto">
                    {
                        loading ? (<LoadingBox />)
                            : error ? (<MessageBox variant="danger">{error}</MessageBox>)
                                : (
                                    <>
                                        <Row xs={1} sm={2} md={3}>
                                            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
                                            {
                                                products.map((products) => {
                                                    return (
                                                        <Col className='mx-auto'><CardItems key={products._id} id={products._id} name={products.name} image={products.image} price={products.price} /></Col>
                                                    );
                                                })
                                            }
                                        </Row>
                                    </>

                                )
                    }
                </Col>
            </Row>
        </div>
    )
}
