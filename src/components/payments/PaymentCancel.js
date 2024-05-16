import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


export default function PaymentCancel(){
    const navigate = useNavigate()
    useEffect(()=>{
        (async()=>{
            try{
                const stripeId = localStorage.getItem('stripeId')
                await axios.put(`http://localhost:4000/api/failed-update/${stripeId}` , { paymentStatus:'failed'})
                alert('payment failed try again..!')
                navigate('/live')
            } catch(err){
                console.log(err)
            }
        })();
    }, [navigate])
    return (
        <div>

        </div>
    )
}