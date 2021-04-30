import Axios from "axios";
import { CAROUSEL_LIST_FAIL, CAROUSEL_LIST_REQUEST, CAROUSEL_LIST_SUCCESS } from "../constants/carouselConstants";
export const listCarousel = () => async(dispatch)=>{
    dispatch({
        type: CAROUSEL_LIST_REQUEST
    });

    try {
        const { data } = await Axios.get('/api/carousels');
        dispatch({type: CAROUSEL_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CAROUSEL_LIST_FAIL, payload: error.message});
    }
}