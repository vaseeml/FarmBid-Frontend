import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import { thunk } from 'redux-thunk'
import { productReducer } from '../reducers/product-reducers'
import { userReducer } from '../reducers/user-reducers'
import { adminReducer } from '../reducers/admin-reducers'
const configureStore=()=>{
    const store=createStore(
        combineReducers({
            products:productReducer,
            user:userReducer,
            admin:adminReducer
        }),applyMiddleware(thunk))
    
    return store
}

export default configureStore