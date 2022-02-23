import rootreducer from './RootReducer'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './list_photo/sagas'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootreducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
export default store;
