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
            return { ...state, liveProducts: [...state.liveProducts, ...action.payload] }
        }
        case 'SET_COMPLETED_PRODUCTS': {
            return { ...state, completedProducts: action.payload }
        }
        case 'SET_UPCOMING_PRODUCTS': {
            return { ...state, upcomingProducts: [...state.upcomingProducts, ...action.payload] }
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
        default: {
            return { ...state }
        }
    }
}