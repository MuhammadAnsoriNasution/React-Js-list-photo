import { combineReducers } from "redux";
import listFotoReducer from './list_photo/reducer';

const rootReducer = combineReducers({
    listFotoReducer: listFotoReducer
})

export default rootReducer