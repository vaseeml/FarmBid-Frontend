import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import { thunk } from 'redux-thunk'
import { productReducer } from '../reducers/product-reducers'
import { authReducer } from '../reducers/auth-reducers'
import { userReducer } from '../reducers/user-reducers'
const configureStore=()=>{
    const store=createStore(
        combineReducers({
            products:productReducer,
            auth:authReducer,
            user:userReducer
        }),applyMiddleware(thunk))
    
    return store
}

export default configureStore