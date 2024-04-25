import axios from 'axios';
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
const socket = io('http://localhost:3000')
export default function LiveBids({ productId }){
    const [ previousBids , setPreviousBids ] = useState([])
    const formatTimestamp = (createdDate)=>{
        const date = new Date(createdDate)
        let hours = date.getHours()
        const minutes = date.getMinutes()
        const ampm = hours > 12 ? 'PM' :'AM'
        hours = hours % 12 || 12
        const formatedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`
        return formatedTime
    }
    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get(`http://localhost:3000/api/product/${productId}/bids` , {
                    headers:{
                        'Authorization':localStorage.getItem('token')
                    }
                })
                setPreviousBids(response.data)
            } catch(err){
                console.log(err)
            }
        })();
    },[])
    useEffect(() => {
        socket.on('newBid', (bidData) => {
        // Handle bid update (e.g., update UI)
        console.log('Received bid update:', bidData)
        setPreviousBids([...previousBids , bidData])
        });

        // Clean up the socket listener when the component unmounts
        return () => {
        socket.off('bidUpdate'); // Remove the bidUpdate listener
        // Emit an event to the server to leave the room
        socket.emit('leaveProductRoom' );

        };
    }, []); // Only run once when the component mounts
    return (
        <div className='list-group'>
        <h3>Previous Bids</h3>
        <div  style={{height: '400px', overflowY: 'scroll'}}>
            {/* Display list of previous bids */}
          <ul>
            {previousBids.map((bid) => (
                <li className={`list-group-item ${bid.sender === 'buyer' ? 'buyer' : 'seller'}`}>
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
        </div>
    )
}