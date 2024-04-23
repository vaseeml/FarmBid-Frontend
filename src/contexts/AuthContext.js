import { createContext , useContext , useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
export const AuthContext = createContext()

export const useAuth = ()=>{
    return useContext(AuthContext)
}

const reducer = (state ,action)=>{
    switch(action.type){
        case 'SET_USER':{
            // navigate('/live')
            return action.payload
        }
        default:{
            return state
        }
    }
}
export const AuthProvider = ({children})=>{
    const [ user , userDispatch ] = useReducer(reducer , null)
    // const navigate = useNavigate()
    console.log('context api ' , user)
    return <AuthContext.Provider value={{user , userDispatch}}>
        {children}
    </AuthContext.Provider>
}