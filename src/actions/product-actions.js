import axios from 'axios'
import { productCreatedNotify } from '../components/Notify'

export const setSelectedCity = (city)=>{
    return {
        type:'SET_SELECTED_CITY',
        payload:city
    }
}

export const getStartProduct = () => {
    return async (dispatch) => {
        try {
            // getting the products for common users
            const response = await axios.get('http://localhost:4000/api/products')
            dispatch(setProducts(response.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const startGetUpComingProducts = ({role , searchQuery , setCity, page , limit })=>{
    // console.log('role' , role , 'search' , searchQuery)
    return async(dispatch)=>{
        try{
            // getting upcoming products based on role
            const response = await axios.get(`http://localhost:4000/api/products/upcoming?role=${role}&&search=${searchQuery?searchQuery :''}&&page=${page?page:1}&&limit=${limit?limit:8}` , {headers:{
                'Authorization':localStorage.getItem('token')
            }})
            // console.log(response.data)
            // const filteredCity = response.data.filter((ele)=>{
            //     if(setCity){
            //         return ele.cities == setCity
            //     }else{
            //         return ele
            //     }
            // })
            dispatch(setUpComingProducts(response.data))
        } catch (err) {
            console.log(err)
        }
    }
}
export const startCreateProducts = (data,navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:4000/api/create/product', data, {
                headers: { 'Authorization': localStorage.getItem("token") }
            })
            productCreatedNotify()
            // navigate('/upcoming')
            const currentTime = new Date()
            if (new Date(response.data?.biddingStart) <= currentTime) {
                dispatch(setLiveCreatedProduct(response.data))
                navigate('/live')
            } else {
                dispatch(setUpcomingCreatedProduct(response.data))
                navigate('/upcoming')
            }
            dispatch(setErrors([]))
        } catch (err) {
            console.log(err)
            dispatch(setErrors(err.response?.data?.errors))
        }
    }
}
const setErrors=(data)=>{
    return{
        type:'SERVER_ERRORS',
        payload:data
    }
}
const setLiveCreatedProduct = (data)=>{
    return {
        type:'SET_LIVE_CREATED_PRODUCT',
        payload:data
    }
}
const setUpcomingCreatedProduct = (data)=>{
    return {
        type:'SET_UPCOMING_CREATED_PRODUCT',
        payload:data
    }
}
export const setProducts = (data) => {
    return {
        type: 'SET_PRODUCTS',
        payload: data
    }
}
export const getStartLiveProducts=({role , searchQuery , setCity , page , limit})=>{
    return async(dispatch)=>{
        try{
            // getting live products based on role
            const response = await axios.get(`http://localhost:4000/api/products/live?role=${role}&&search=${searchQuery?searchQuery :''}&&page=${page?page:1}&&limit=${limit?limit:8}`,{
                headers:{'Authorization':localStorage.getItem('token')}
            })
            // const filteredCity = response.data.filter((ele)=>{
            //     if(setCity){
            //         return ele.cities == setCity
            //     }else{
            //         return ele
            //     }
            // })
            console.log('ghelajd;lagha;lhgd;lajg' , response.data)
            dispatch(setLiveProducts(response.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const setLiveProducts = (data) => {
    return {
        type: 'SET_LIVE_PRODUCTS',
        payload: data
    }
}
export const getStartCompletedProducts=({role , searchQuery, page , limit })=>{
    return async(dispatch)=>{
        try{
            // getting completed products based on role
            const response = await axios.get(`http://localhost:4000/api/products/completed?role=${role}&&search=${searchQuery?searchQuery:''}&&page=${page?page:1}&&limit=${limit?limit:8}`,{
                headers:{'Authorization':localStorage.getItem('token')}
            })
            dispatch(setCompletedProducts(response.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const setCompletedProducts = (data) => {
    return {
        type: 'SET_COMPLETED_PRODUCTS',
        payload: data
    }
}
const setUpComingProducts = (data) => {
    return {
        type: 'SET_UPCOMING_PRODUCTS',
        payload: data
    }
}

export const setDeleteProduct = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/delete/${id}`, {
                headers: { 'Authorization': localStorage.getItem("token") }
            })
            dispatch(deleteProduct(response.data))
        } catch (err) {
            console.log(err)
        }
    }
}
const deleteProduct = (data) => {
    return {
        type: 'DELETE_PRODUCT',
        payload: data
    }
}
export const startEditProduct = (id, formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:4000/api/update/${id}`, formData, {
                headers: {
                    'Authorization': localStorage.getItem("token"),
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch(editProduct(response.data))
            dispatch(setErrors([]))
        } catch (err) {
            console.log(err)
            dispatch(setErrors(err.response?.data?.errors))
        }
    }
}
const editProduct = (data) => {
    return {
        type: 'EDIT_PRODUCT',
        payload: data
    }
}

export const removeProductFromUpcoming = (productId)=>{
    return {
        type:'REMOVE_PRODUCT_FROM_UPCOMING',
        payload:productId
    }
}
export const addProductToLive = (productId)=>{
    return async(dispatch)=>{
        dispatch({
            type:'ADD_PRODUCT_TO_LIVE',
            payload:productId
        })
    }
}
export const addProductToCompleted = (product)=>{
    return {
            type:'ADD_PRODUCT_TO_COMPLETED',
            payload:product
    }
}

export const removeProductFromLive = (product)=>{
    return {
        type:'REMOVE_PRODUCT_FROM_LIVE',
        payload:product
    }
}

// export const startFilterLiveProductsOnCities = (searchCity)=>{
//     return {
//         type:'SET_FILTERED_LIVE_PRODUCTS',
//         payload:searchCity
//     }
// }

export const searchQueryProducts=({role , searchQuery , path , page , limit})=>{
    return async(dispatch)=>{
        try{
            // getting live products based on role
            const response = await axios.get(`http://localhost:4000/api/products${path}?role=${role}&&search=${searchQuery?searchQuery :''}&&page=${page?page:1}&&limit=${limit?limit:8}`,{
                headers:{'Authorization':localStorage.getItem('token')}
            })
            if(path == '/live'){
                console.log('search results for live' , response.data)
                dispatch(setSearchedLiveProducts(response.data))
            }
            if(path == '/upcoming'){
                console.log('search results for upcoming' , response.data)
                dispatch(setSearchedUpcomingProducts(response.data))
            }
            if(path == '/completed'){
                console.log('search results for completed' , response.data)
                dispatch(setSearchedCompletedProducts(response.data))
            }
        } catch (err) {
            console.log(err)
        }
    }
}

const setSearchedLiveProducts = (data)=>{
    return {
        type:'SET_SEARCH_LIVE_PRODUCT',
        payload:data
    }
}
const setSearchedUpcomingProducts = (data)=>{
    return {
        type:'SET_SEARCH__UPCOMING_PRODUCT',
        payload:data
    }
}
const setSearchedCompletedProducts = (data)=>{
    return {
        type:'SET_SEARCH_COMPLETED_PRODUCT',
        payload:data
    }
}