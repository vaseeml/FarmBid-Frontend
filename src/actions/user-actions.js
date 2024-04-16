import axios from 'axios'

export const startWalletUpdate = (updateAmount)=>{
    return async(dispatch)=>{
        try{
            const formData = {
                balance:Number(updateAmount)
            }
            const response = await axios.put('http://localhost:3000/api/wallet/credit' ,formData, { headers:{
                'Authorization':localStorage.getItem('token')
            }})
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