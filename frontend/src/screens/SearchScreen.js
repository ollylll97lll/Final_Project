import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Col from '../../node_modules/react-bootstrap/esm/Col';
import Row from '../../node_modules/react-bootstrap/esm/Row';
import { prices } from '../utils';
import { listProducts } from '../actions/productActions';
import CardItems from '../components/CardItems';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SearchScreen(props) {
    const { name = 'all', category = 'all', min = 0, max = 0, order = 'latest' } = useParams();
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
                min,
                max,
                order
            })
        );
    }, [category, dispatch, max, min, name, order]);

    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;

        const sortOrder = filter.order || order;


        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}`;
    };
    return (
        <div style={{ marginTop: "120px" }} className='mx-3'>
            <Row fluid>
                {/* N.O RESULTS */}
                {
                    loading ? (<LoadingBox />)
                        : error ? (<MessageBox variant="danger">{error}</MessageBox>)
                            : (
                                <div className="ml-3">
                                    {products.length} Results found.
                                </div>
                            )
                }
                {/* SORTING */}
                <div>
                    Sort by: {' '}

                    <select value={order}
                        onChange={(e) => {
                            props.history.push(getFilterUrl({order: e.target.value}))
                        }}>
                            <option value="latest">Latest</option>
                            <option value="lowest">Price (from Low to High)</option>
                            <option value="highest">Price (from High to Low)</option>
                    </select>
                </div>

            </Row>
            <Row fluid>
                <Col md={12} lg={3}>
                    <h3>Filter: </h3>

                    <div>
                        {loadingCategories ? (
                            <LoadingBox></LoadingBox>
                        ) : errorCategories ? (
                            <MessageBox variant="danger">{errorCategories}</MessageBox>
                        ) : (
                            <ul>
                                <li>
                                    <Link
                                        className={'all' === category ? 'active' : ''}
                                        to={getFilterUrl({ category: 'all' })}
                                    >All</Link>
                                </li>

                                {categories.map((cat) => (
                                    <li key={cat}>
                                        <Link
                                            className={cat === category ? 'active' : ''}
                                            to={getFilterUrl({ category: cat })}
                                        >
                                            {cat}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <h3>Price</h3>
                        <ul>
                            {prices.map((pri) => (
                                <li key={pri.name}>
                                    <Link
                                        to={getFilterUrl({ min: pri.min, max: pri.max })}
                                        className={` ${pri.min}-${pri.max} ` === `${min}-${max}` ? 'active' : ''}
                                    >
                                        <span>{pri.name}</span>
                                    </Link>
                                </li>
                            )

                            )}
                        </ul>
                    </div>

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
