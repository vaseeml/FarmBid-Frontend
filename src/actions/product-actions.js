import axios from 'axios'
import { productCreatedNotify } from '../components/Notify'
import { useNavigate } from 'react-router-dom'

export const getStartProduct = () => {
    return async (dispatch) => {
        try {
            // getting the products for common users
            const response = await axios.get('http://localhost:3000/api/products')
            dispatch(setProducts(response.data))
        } catch (err) {
            console.log(err)
        }
    }
}

export const startGetUpComingProducts = (role)=>{
    return async(dispatch)=>{
        try{
            // getting upcoming products based on role
            const response = await axios.get(`http://localhost:3000/api/products/upcoming?role=${role}` , {headers:{
                'Authorization':localStorage.getItem('token')
            }})
            // console.log(response.data)
            dispatch(setUpComingProducts(response.data))
        } catch (err) {
            console.log(err)
        }
    }
}
export const startCreateProducts = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3000/api/create/product', data, {
                headers: { 'Authorization': localStorage.getItem("token") }
            })
            productCreatedNotify()
            const currentTime = new Date()
            const navigate = useNavigate()
            if (new Date(response.data?.biddingStart) < currentTime) {
                dispatch(setLiveProducts(response.data))
                navigate('/live')
            } else {
                dispatch(setUpComingProducts(response.data))
                navigate('/upcoming')
            }
        } catch (err) {
            console.log(err)
        }
    }
}
export const setProducts = (data) => {
    return {
        type: 'SET_PRODUCTS',
        payload: data
    }
}
export const getStartLiveProducts=(role)=>{
    console.log('role in live' , role)
    return async(dispatch)=>{
        try{
            // getting live products based on role
            const response = await axios.get(`http://localhost:3000/api/products/live?role=${role}`,{
                headers:{'Authorization':localStorage.getItem('token')}
            })
            console.log('populate' , response.data)
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
export const getStartCompletedProducts=(role)=>{
    console.log(role)
    return async(dispatch)=>{
        try{
            // getting completed products based on role
            const response = await axios.get(`http://localhost:3000/api/products/completed?role=${role}`,{
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
            const response = await axios.delete(`http://localhost:3000/api/delete/${id}`, {
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
            console.log('id', id)
            console.log('form', formData)
            const response = await axios.put(`http://localhost:3000/api/update/${id}`, formData, {
                headers: {
                    'Authorization': localStorage.getItem("token"),
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch(editProduct(response.data))
        } catch (err) {
            console.log(err)
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