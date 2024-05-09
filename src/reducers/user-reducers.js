const initialState = {
    wallet:{},
    profile:{}
}
export const userReducer = (state = initialState , action)=>{
    switch(action.type){
        case 'SET_WALLET':{
            return {...state , wallet:action.payload}
        }
        case 'SET_UPDATE_WALLET':{
            return {...state , wallet:{...state.wallet , balance:state.wallet.balance - action.payload}}
        }
        case 'SET_CREDIT_WALLET_BACK':{
            return {...state , wallet:{...state.wallet , balance:state.wallet.balance + action.payload.amount}}
        }
        case 'SET_PROFILE':{
            return {...state , profile:action.payload}
        }
        default:{
            return {...state}
        }
    }
}