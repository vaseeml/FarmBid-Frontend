const initialState = {
    data:{}
}
export const authReducer = (state = initialState , action)=>{
    switch(action.type){
        case 'SET_TOKENDATA':{
            return {...state , data:action.payload}
        }
        default:{
            return {...state}
        }
    }
}