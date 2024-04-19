const initialState = {
    wallet:{},
    profile:{}
}
export const userReducer = (state = initialState , action)=>{
    switch(action.type){
        case 'SET_WALLET':{
            return {...state , wallet:action.payload}
        }
        case 'SET_PROFILE':{
            return {...state , profile:action.payload}
        }
        default:{
            return {...state}
        }
    }
}