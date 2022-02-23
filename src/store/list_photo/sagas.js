import { all, call, put, takeEvery } from 'redux-saga/effects';
import { requestGetAxios } from '../../utils/services';
import {
    GET_DATA_PHOTO_REQUEST,
    GET_DATA_PHOTO_REQUEST_FAILED,
    GET_DATA_PHOTO_REQUEST_SUCCESS,
    GET_DETAIL,
    GET_DETAIL_FAILED,
    GET_DETAIL_SUCCESS,
    LOADING, SEARCH_PHOTO_REQUEST,
    SEARCH_PHOTO_REQUEST_FAILED,
    SEARCH_PHOTO_REQUEST_SUCCESS
} from './const';

function* fetchGetDataPhotoRequest(params) {
    try {
        yield put({ type: LOADING })
        const data = yield call(requestGetAxios, { params: { per_page: 15 }, url: `${process.env.REACT_APP_REST_API}/photos` })
        yield put({ type: GET_DATA_PHOTO_REQUEST_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: GET_DATA_PHOTO_REQUEST_FAILED, message: e.message });
    }
}

function* fetchSearchRequest(params) {
    try {
        yield put({ type: LOADING })
        const data = yield call(requestGetAxios, { params: { per_page: 15, query: params.payload.keyword, page: params.payload.page, }, url: `${process.env.REACT_APP_REST_API}/search/photos` })
        yield put({ type: SEARCH_PHOTO_REQUEST_SUCCESS, payload: data.results, page: params.payload.page })
    } catch (e) {
        yield put({ type: SEARCH_PHOTO_REQUEST_FAILED, message: e.message });
    }
}

function* fetchGetDetail(params) {
    try {
        const data = yield call(requestGetAxios, { params: {}, url: `${process.env.REACT_APP_REST_API}/photos/${params.id}` })
        yield put({ type: GET_DETAIL_SUCCESS, payload: data })
    } catch (e) {
        yield put({ type: GET_DETAIL_FAILED, message: e.message });
    }
}

function* getDataPhotoRequest() {
    yield takeEvery(GET_DATA_PHOTO_REQUEST, fetchGetDataPhotoRequest);
}

function* searchRequest() {
    yield takeEvery(SEARCH_PHOTO_REQUEST, fetchSearchRequest);
}


function* getDetail() {
    yield takeEvery(GET_DETAIL, fetchGetDetail);
}


export default function* rootSaga() {
    yield all([
        getDataPhotoRequest(),
        searchRequest(),
        getDetail()
    ])
}