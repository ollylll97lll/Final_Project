import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../node_modules/axios/index';
import Button from '../../node_modules/react-bootstrap/esm/Button';
import Form from '../../node_modules/react-bootstrap/esm/Form';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {
    // get the product id
    const productId = props.match.params.id;
    // set state of data
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [coll3ction, setColl3ction] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');

    // get from redux store
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    // use Dispatch to retreive data from redux store
    const dispatch = useDispatch();

    useEffect(() => {
        if (successUpdate) {
            props.history.push('/productlist')
        }


        // get from the sever cannot get it from the Redux store
        // OR if the _id get from the product state does not match the Id passed into the page
        if (!product || product._id !== productId || successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch(detailsProduct(productId));
        }
        // if it does return the data
        else {
            setName(product.name);
            setImage(product.image);
            setColl3ction(product.coll3ction);
            setCategory(product.category);
            setDescription(product.description);
            setPrice(product.price);
            setCountInStock(product.countInStock);
        }
    }, [product, dispatch, productId, successUpdate, props.history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ _id: productId, name, price, image, category, coll3ction, description, countInStock }))
    }


    const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

    return (
        <div>
            <Form onSubmit={submitHandler} className="mx-auto" style={{ width: "80%", paddingTop: "120px" }} >
                <div><h1>Edit Product <h2>{name}</h2></h1></div>
                {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                {loadingUpdate && (<LoadingBox />)}
                {
                    loading ? <LoadingBox />
                        :
                        error ? <MessageBox variant="danger">{error}</MessageBox>
                            : (
                                <>
                                    <Form.Group>
                                        <Form.Label style={{ fontFamily: 'cyclicsans-bold' }}>Name: </Form.Label>
                                        <Form.Control type="text" id="name" placeholder="Enter name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label style={{ fontFamily: 'cyclicsans-bold' }}>Image: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            id="image"
                                            placeholder="Enter image"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form>
                                        <Form.Group>
                                            <Form.File 
                                            id="imageFile" 
                                            label=" Choose Image File:" 
                                            name="imagefile" 
                                            onChange={uploadFileHandler} />
                                        </Form.Group>
                                        {loadingUpload && <LoadingBox />}
                                        {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
                                    </Form>

                                    <Form.Group>
                                        <Form.Label style={{ fontFamily: 'cyclicsans-bold' }}>Collection: </Form.Label>
                                        <Form.Control type="text" id="coll3ction" placeholder="Enter collection"
                                            value={coll3ction}
                                            onChange={(e) => setColl3ction(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label style={{ fontFamily: 'cyclicsans-bold' }}>Category: </Form.Label>
                                        <Form.Control type="text" id="category" placeholder="Enter category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label style={{ fontFamily: 'cyclicsans-bold' }}>Price: </Form.Label>
                                        <Form.Control type="number" id="price" placeholder="Enter Price (VNĐ)"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label style={{ fontFamily: 'cyclicsans-bold' }}>Count In Stock: </Form.Label>
                                        <Form.Control type="number" id="countInStock" placeholder="Enter count in stock"
                                            value={countInStock}
                                            onChange={(e) => setCountInStock(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label style={{ fontFamily: 'cyclicsans-bold' }}>Description: </Form.Label>
                                        <Form.Control as="textarea" rows={3} type="text" id="description" placeholder="Enter description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" style={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>Update</Button>
                                </>
                            )
                }
            </Form>

        </div>
    )
}
