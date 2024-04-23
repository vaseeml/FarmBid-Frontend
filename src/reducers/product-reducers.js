const initialState = {
    data: [],
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
        case 'SET_LIVE_PRODUCTS': {
            return { ...state, liveProducts:action.payload }
        }
        case 'SET_COMPLETED_PRODUCTS': {
            return { ...state, completedProducts: action.payload }
        }
        case 'SET_UPCOMING_PRODUCTS': {
            return { ...state, upcomingProducts: action.payload }
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
        default: {
            return { ...state }
        }
    }
}