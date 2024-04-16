const initialState = {
    data:[],
    liveProducts:[],
    completedProducts:[],
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
        }
        default:{
            return {...state}
        }
    }
}