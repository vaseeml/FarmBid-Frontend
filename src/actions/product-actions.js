import axios from 'axios'

export const getStartProduct = ()=>{
    return async(dispatch)=>{
        try{
            const response = await axios.get('http://localhost:3000/api/products')
            dispatch(setProducts(response.data))
        }catch(err){
            console.log(err)
        }
    }
}

export const setProducts = (data)=>{
    return {
        type:'SET_PRODUCTS',
        payload:data
    }
}

export const getStartLiveProducts=(role)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.get(`http://localhost:3000/api/products/live?role=${role}`,{
                headers:{'Authorization':localStorage.getItem('token')}
            })
            dispatch(setLiveProducts(response.data))
        }catch(err){
            console.log(err)
        }
    }
}

export const setLiveProducts = (data)=>{
    return {
        type:'SET_LIVE_PRODUCTS',
        payload:data
    }
}
export const getStartCompletedProducts=(role)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.get(`http://localhost:3000/api/products/completed?role=${role}`,{
                headers:{'Authorization':localStorage.getItem('token')}
            })
            dispatch(setCompletedProducts(response.data))
        }catch(err){
            console.log(err)
        }
    }
}

export const setCompletedProducts = (data)=>{
    return {
        type:'SET_COMPLETED_PRODUCTS',
        payload:data
    }
}