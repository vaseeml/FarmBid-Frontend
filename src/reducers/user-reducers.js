const initialState = {
    wallet:{}
}
export const userReducer = (state = initialState , action)=>{
    switch(action.type){
        case 'SET_WALLET':{
            return {...state , wallet:action.payload}
        }
        default:{
            return {...state}
        }
    }
}