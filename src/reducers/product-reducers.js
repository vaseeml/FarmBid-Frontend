const initialState = {
    data: [],
    setCity:'',
    liveProducts: [],
    completedProducts: [],
    upcomingProducts: [],
    serverErrors: []
}
export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS': {
            return { ...state, data: action.payload }
        }
        case 'SET_SELECTED_CITY':{
            return { ...state , setCity:action.payload}
        }
        case 'SET_LIVE_PRODUCTS': {
            // Filter out duplicate products based on their IDs
            const uniqueProducts = action.payload.filter(newProduct => (
                state.liveProducts.every(existingProduct => existingProduct._id !== newProduct._id)
            ))
            
            // Spread the unique products into the liveProducts array
            return { ...state, liveProducts: [...state.liveProducts, ...uniqueProducts] }
        }
        case 'SET_SEARCH_PRODUCT':{
            return {...state , liveProducts:action.payload}
        }
        case 'SET_LIVE_CREATED_PRODUCT':{
            return {...state , liveProducts:[...state.liveProducts , action.payload]}
        }
        case 'SET_COMPLETED_PRODUCTS': {
            const uniqueProducts = action.payload.filter(newProduct => (
                state.completedProducts.every(existingProduct => existingProduct._id !== newProduct._id)
            ))
            
            // Spread the unique products into the liveProducts array
            return { ...state, completedProducts: [...state.completedProducts, ...uniqueProducts] }
        }
        case 'SET_UPCOMING_PRODUCTS': {
            const uniqueProducts = action.payload.filter(newProduct => (
                state.upcomingProducts.every(existingProduct => existingProduct._id !== newProduct._id)
            ))
            
            // Spread the unique products into the liveProducts array
            return { ...state, upcomingProducts: [...state.upcomingProducts, ...uniqueProducts] }
        }
        case 'SET_UPCOMING_CREATED_PRODUCT':{
            return {...state , upcomingProducts:[...state.upcomingProducts , action.payload]}
        }
        case 'DELETE_PRODUCT': {
            return { ...state, upcomingProducts: state.upcomingProducts.filter((ele) => ele._id !== action.payload._id) }
        }
        case 'EDIT_PRODUCT': {
            return {
                ...state, upcomingProducts: state.upcomingProducts.map((ele) => {
                    if (ele._id == action.payload._id) {
                        return action.payload
                    } else {
                        return ele
                    }
                })
            }
        }
        case 'REMOVE_PRODUCT_FROM_UPCOMING':{
            return {
                ...state , upcomingProducts:state.upcomingProducts.filter((ele)=>{
                    return ele._id !== action.payload
                })
            }
        }
        case 'REMOVE_PRODUCT_FROM_LIVE':{
            return {
                ...state , liveProducts:state.liveProducts.filter(ele=>ele._id !== action.payload._id)
            }
        }
        case 'ADD_PRODUCT_TO_LIVE':{
            return {
                ...state , liveProducts:[...state.liveProducts , state.upcomingProducts.find(ele=>ele._id == action.payload)]
            }
        }
        case 'ADD_PRODUCT_TO_COMPLETED':{
            return {
                ...state , completedProducts:[...state.completedProducts , action.payload]
            }
        }
        case 'SET_FILTERED_LIVE_PRODUCTS':{
            console.log('action ' , action.payload)
            return {
                ...state , liveProducts:state.liveProducts.filter((ele)=>{
                    return ele.cities == action.payload
                })
            }
        }
        case 'SERVER_ERRORS':{
            return{...state,serverErrors:action.payload}
        }
        default: {
            return { ...state }
        }
    }
}