import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import Col from '../../node_modules/react-bootstrap/esm/Col';
import Pagination from '../../node_modules/react-bootstrap/esm/Pagination';
import Row from '../../node_modules/react-bootstrap/esm/Row';
import Table from '../../node_modules/react-bootstrap/esm/Table';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {
  const { pageNumber = 1 } = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  // DEFINE CREATE
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  // DEFINE DELETE
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = productDelete;


  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts( {pageNumber} ));
  }, [createdProduct, dispatch, props.history, successCreate, successDelete, pageNumber]);


  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div style={{ marginTop: "120px" }}>
      <Row>
        <Col><h1>Products</h1></Col>
        <Col><button className="btn btn-primary" onClick={createHandler} style={{ float: "right" }}>Create Product </button></Col>

      </Row>

      {/* when delete, loading, if failed, send error */}
      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {/* when create, loading, if failed, send error */}
      {loadingCreate && <LoadingBox />}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {/* loading */}
      {loading ? <LoadingBox />
        : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (<>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>COLLECTION</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            {products.map((product) => (
              <tbody>
                <tr key={product._id} />
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.collection}</td>
                <td>
                  <button size="small" className="btn btn-outline-primary" style={{ marginRight: "0.5rem" }} onClick={() => props.history.push(`/product/${product._id}/edit`)}>Edit</button>
                  <button size="small" className="btn btn-outline-danger" onClick={() => deleteHandler(product)}>Delete</button>
                </td>
              </tbody>
            ))}
          </Table>

          <div>
            <Pagination className="text-center">
              <Pagination.First href={`/productlist/pageNumber/1`} />
              <Pagination.Prev href={`/productlist/pageNumber/${page - 1}`} />
              {
                [...Array(pages).keys()].map( (x) => (
                  // ARRAY START FROM 0 SO PAGE START AT 0 + 1
                  <Pagination.Item className={(x + 1) === page ? 'active' : ''} key={x + 1} href={`/productlist/pageNumber/${x + 1}`}> {x + 1} </Pagination.Item>
                ))
              }
              <Pagination.Next href={`/productlist/pageNumber/${page + 1}`} />
              <Pagination.Last href={`/productlist/pageNumber/${pages}`} />
            </Pagination>
          </div>
        </>
        )}
    </div>
  )
}
