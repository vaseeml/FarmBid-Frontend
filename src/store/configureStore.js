import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import { thunk } from 'redux-thunk'
import { productReducer } from '../reducers/product-reducers'
const configureStore=()=>{
    const store=createStore(
        combineReducers({
            products:productReducer
        }),applyMiddleware(thunk))
    
    return store
}

export default configureStore