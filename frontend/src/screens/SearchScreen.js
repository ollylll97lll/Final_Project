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
import Pagination from '../../node_modules/react-bootstrap/esm/Pagination';

export default function SearchScreen(props) {
    const { name = 'all', category = 'all', min = 0, max = 0, order = 'latest', pageNumber = 1 } = useParams();
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, pages, page } = productList;

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
                order,
                pageNumber,
            })
        );
    }, [category, dispatch, max, min, name, order, pageNumber]);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || pageNumber;
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;

        const sortOrder = filter.order || order;


        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/pageNumber/${filterPage}`;
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
                            props.history.push(getFilterUrl({ order: e.target.value }))
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
                                       <div>
                                       <Pagination className="text-center">
                                            <Pagination.First href={getFilterUrl({ page: 1 })}/>
                                            <Pagination.Prev href={getFilterUrl({ page: page - 1 })}/>
                                            {
                                                [...Array(pages).keys()].map(x => (
                                                    // ARRAY START FROM 0 SO PAGE START AT 0 + 1
                                                    <Pagination.Item className={ (x+1)===page ? 'active': '' } key={x + 1} href={getFilterUrl({ page: x + 1 })}> {x + 1} </Pagination.Item>
                                                ))
                                            }
                                            <Pagination.Next href={getFilterUrl({ page: page + 1})}/>
                                            <Pagination.Last href={getFilterUrl({ page: pages})}/>
                                        </Pagination>
                                       </div>
                                    </>

                                )
                    }
                </Col>
            </Row>
        </div>
    )
}
