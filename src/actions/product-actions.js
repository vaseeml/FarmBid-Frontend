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