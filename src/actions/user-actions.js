import axios from 'axios'

export const startWalletUpdate = (stripeId)=>{
    return async(dispatch)=>{
        try{
            // payment updating with transaction id
            const paymentUpdate =await axios.put(`http://localhost:3000/api/success-update/${stripeId}` , {paymentStatus:'successful'})
            console.log('payment ' , paymentUpdate) // the response of this is not similar to other
            // updating the wallet balance
            const response =await axios.put('http://localhost:3000/api/wallet/credit' ,{balance:paymentUpdate.data?.amount}, { headers:{
                'Authorization':localStorage.getItem('token')
            }})
            // const response = await Promise.all([paymentUpdate , walletUpdate])
            // console.log('response after promise' , response.data)
            dispatch(setWallet(response.data))
        }catch(err){
            console.log(err)
        }
    }
}

export const startGetWallet = (id)=>{
    // no need of id bcz backend is taking care
    return async(dispatch)=>{
        try{
            const response = await axios.get('http://localhost:3000/api/wallet' , {
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            dispatch(setWallet(response.data))
        }catch(err){
            console.log(err)
        }
    }
}
export const setWallet = (data)=>{
    return {
        type:'SET_WALLET',
        payload:data
    }
}
export const setProfile = (data)=>{
    return {
        type:'SET_PROFILE',
        payload:data
    }
}