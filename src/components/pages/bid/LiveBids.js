import swal from 'sweetalert'
import { useState } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { useAuth } from '../../../contexts/AuthContext'
const socket = io('http://localhost:3000')
export default function LiveBids({ productId ,previousBids, updateLatestBids}){
    const [ number , setNumber ] = useState('')
    const [ serverErrors , setServerErrors ] = useState({})
    const {user} = useAuth()
    const formatTimestamp = (createdDate)=>{
        const date = new Date(createdDate)
        let hours = date.getHours()
        const minutes = date.getMinutes()
        const ampm = hours > 12 ? 'PM' :'AM'
        hours = hours % 12 || 12
        const formatedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`
        return formatedTime
    }
    const handleClick = async()=>{
        const formData = {
            amount:Number(number),
            productId:productId
        }
        try{
            // placing the bid 
            const response = await axios.post('http://localhost:3000/api/bid' , formData , {headers:{ 'Authorization':localStorage.getItem('token')}})
            // sending the data to product connected users
            socket.emit('newBid' , response.data)
            console.log('emit' , response.data)
            // updateLatestBids(response.data)
            // reseting the state
            swal('Bid Placed!', `amount ${response.data.amount}` , 'success')
            setNumber('')
            setServerErrors({})
        } catch(err){
            console.log(err)
            setServerErrors(err.response.data)
        }
    }
    return (
        <div className='list-group'>
        <h3>Previous Bids</h3>
        <div  style={{height: '400px', overflowY: 'scroll'}}>
            {/* Display list of previous bids */}
            <ul>
            {previousBids?.map((bid) => (
                <li className={`list-group-item ${bid.sender === 'buyer' ? 'buyer' : 'seller'}`} key={bid._id}>

                <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{bid.bidderId?.username}</h5>
                <small>{formatTimestamp(bid.createdAt)}</small>
                {/* <small>{bid.createdAt}</small> */}
                </div>
                <p className="mb-1">Bid Amount: {bid.amount}</p>
            </li>
            ))}
            </ul>
        </div>
        {user?.role == 'buyer' && <div >
            <input type='number' value={number} onChange={(e)=>setNumber(e.target.value)}/>
            <button className="btn btn-success" onClick={handleClick}>Bid</button>
            { Object.keys(serverErrors).length !== 0 && <p style={{color:'red'}}>{serverErrors.error}</p>}
        </div>}
        </div>
    )
}