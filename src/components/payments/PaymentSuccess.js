import { useEffect } from 'react'
import {startWalletUpdate} from '../../actions/user-actions'
import { useDispatch } from 'react-redux'
export default function PaymentSuccess(){
    const dispatch = useDispatch()
    useEffect(()=>{
        (async()=>{
            try{
                // get stripeId from localStorage
                const stripeId = localStorage.getItem('stripeId')
                // dispatch the function to update the payment status and wallet
                dispatch(startWalletUpdate(stripeId))
            } catch(err){
                console.log(err)
            }
        })()
    },[dispatch])
    return (
        <div>
            
        </div>
    )
}