const initialState = {
    data:[],
    serverErrors:[]
}
export const productReducer = (state = initialState , action)=>{
    switch(action.type){
        case 'SET_PRODUCTS':{
            return {...state , data:action.payload}
        }
        default:{
            return {...state}
        }
    }
}