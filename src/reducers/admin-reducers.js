const initialState = {
    profiles:[]
}
export const adminReducer = (state = initialState , action)=>{
    switch(action.type){
        case 'SET_PROFILES':{
            return {...state , profiles:action.payload}
        }
        default:{
            return {...state}
        }
    }
}