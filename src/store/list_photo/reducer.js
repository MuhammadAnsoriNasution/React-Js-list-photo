import { GET_DATA_PHOTO_REQUEST_SUCCESS, GET_DETAIL_SUCCESS, LOADING, SEARCH_PHOTO_REQUEST_SUCCESS } from "./const";

const initialValue = {
    data: [],
    loadMore: false,
    loading: false,
    detail: {}
}

const reducer = (state = initialValue, action) => {
    switch (action.type) {
        case GET_DATA_PHOTO_REQUEST_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false
            }
        case SEARCH_PHOTO_REQUEST_SUCCESS:
            return {
                ...state,
                data: action.page === 1 ? action.payload : [...state.data, ...action.payload],
                loadMore: action.payload.length > 0,
                loading: false
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_DETAIL_SUCCESS:
            return {
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }
}
export default reducer