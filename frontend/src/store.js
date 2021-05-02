import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from './reducers/productReducers';
import { carouselListReducer } from './reducers/carouselReducers';
import { cartReducer } from './reducers/cartReducers';
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderMineListReducer, orderPayReducer} from './reducers/orderReducers';

// set initial state to empty
const initialState = {
    userLogin: {
        userInfo: localStorage.getItem('userInfo')
            ?
            JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },

    cart: {
        cartItems: localStorage.getItem('cartItems')
            ?
            JSON.parse(localStorage.getItem('cartItems'))
            :
            [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'PayPal',
    }
};
// store all reducer List into one
const reducer = combineReducers({
    productList: productListReducer,
    carouselList: carouselListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer
})
// send to the extension to view
const composeEnhance = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// store the data
const store = createStore(reducer, initialState, composeEnhance(applyMiddleware(thunk)));
export default store;
