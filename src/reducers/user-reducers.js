const initialState = {
    balance:0
}
export const userReducer = (state = initialState , action)=>{
    switch(action.type){
        case 'SET_WALLET':{
            return {...state , balance:action.payload}
        }
        default:{
            return {...state}
        }
    }
}