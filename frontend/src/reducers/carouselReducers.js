import { CAROUSEL_LIST_FAIL, CAROUSEL_LIST_REQUEST, CAROUSEL_LIST_SUCCESS} from "../constants/carouselConstants";
export const carouselListReducer = (state = { load: true, carousel: []}, action) => {
    switch (action.type) {
        case CAROUSEL_LIST_REQUEST:
            return { load: true };
        case CAROUSEL_LIST_SUCCESS:
            return { load: false, carouseldata: action.payload };
        case CAROUSEL_LIST_FAIL:
            return { load: false, err: action.payload };
        default: return state;
    }
}