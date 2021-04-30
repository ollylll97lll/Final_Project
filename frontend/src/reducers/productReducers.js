import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants";
// set the product to empty array [] instead of null to prevent error
export const productListReducer = (state = { loading: true, product: [] }, action) => {
    switch (action.type) {
        // when request set loading to true
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        // if success, send the data to the data function set in the Home page
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            // else send to the error to the error function set in the Home page
            return { loading: false, error: action.payload };
        default: return state;
    }
}
// set the product to empty object {} instead of null to prevent error
export const productDetailsReducer = (state = { loading: true}, action) => {
    switch (action.type) {
        // when request set loading to true
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        // if success, send the data to the data function set in the Home page
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            // else send to the error to the error function set in the Home page
            return { loading: false, error: action.payload };
        default: return state;
    }
}
export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        // when request set loading to true
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };
        // if success, send the data to the data function set in the Home page
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_CREATE_FAIL:
            // else send to the error to the error function set in the Home page
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_RESET:
            return {};
        default: return state;
    }
}

export const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        // when request set loading to true
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        // if success, send the data to the data function set in the Home page
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true};
        case PRODUCT_UPDATE_FAIL:
            // else send to the error to the error function set in the Home page
            return { loading: false, error: action.payload };
        case PRODUCT_UPDATE_RESET:
            return {};
        default: return state;
    }
}