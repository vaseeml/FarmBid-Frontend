const initialState = {
    data:[],
    liveProducts:[],
    completedProducts:[],
    upcomingProducts:[],
    serverErrors:[]
}
export const productReducer = (state = initialState , action)=>{
    switch(action.type){
        case 'SET_PRODUCTS':{
            return {...state , data:action.payload}
        }
        case 'SET_LIVE_PRODUCTS':{
            return {...state,liveProducts:action.payload}
        }
        case 'SET_COMPLETED_PRODUCTS':{
            return {...state,completedProducts:action.payload}

        case 'SET_UPCOMING_PRODUCTS':{
            return {...state ,upcomingProducts:action.payload }
        }
        default:{
            return {...state}
        }
    }
}