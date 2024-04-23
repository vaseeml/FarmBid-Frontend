import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect , useState } from 'react'
import axios from 'axios'

import io from 'socket.io-client';
import CountDownTimer from '../../products/CountDownTimer';
import LiveBids from './LiveBids';

const socket = io('http://localhost:3000')
export default function Bid(){
    const [ number , setNumber ] = useState('')
    const { id } = useParams()
    const product = useSelector((state)=>{
        return state.products.liveProducts.find(ele=>ele._id == id)
    })
    useEffect(()=>{
        socket.emit('joinProductRoom' , id)
        // Clean up the socket listener when the component unmounts
        return () => {
            socket.off('bidUpdate'); // Remove the bidUpdate listener
            };
    } , [])
     // Listen for bid updates in the product room
    // useEffect(() => {
    //     socket.on('newBid', (bidData) => {
    //     // Handle bid update (e.g., update UI)
    //     console.log('Received bid update:', bidData);
    //     });

    //     // Clean up the socket listener when the component unmounts
    //     return () => {
    //     socket.off('bidUpdate'); // Remove the bidUpdate listener
    //     // Emit an event to the server to leave the room
    //     socket.emit('leaveProductRoom', id);

    //     };
    // }, []); // Only run once when the component mounts
    const handleClick = async()=>{
        const formData = {
            amount:Number(number),
            productId:id
        }
        try{
            // placing the bid 
            const response = await axios.post('http://localhost:3000/api/bid' , formData , {headers:{ 'Authorization':localStorage.getItem('token')}})
            // sending the data to product connected users
            socket.emit('newBid' , response.data)
            // reseting the state
            setNumber('')
        } catch(err){
            console.log(err)
        }
    }
    return (
        <div className='row justify-content-center'>
        <div key={product._id} className="col-md-4">
        <div>
        <img
                src={`http://localhost:3000/${product?.productImg}`} alt='img'
                height='300px' width='260px'
            />
        
        <div className="card-body"><h3 className="card-title">{product.productName}</h3>
        {/* <video controls height='300px' width='260px'>
                <source
                key={product._id}
                src={`http://localhost:3000/${product.productVideo}`}
                />
            </video> */}
        <p className="card-text">{product.sellerId?.phone}</p></div>
        </div>
        <p>Base Price - {product.basePrice}</p>
        <p>Farmer - {product.sellerId?.name}</p>
        <p>Mobile Number - {product.sellerId?.phone}</p>
        <p>Stock - {product.stock}</p>
        <p>Address - {product.address}</p>
        </div>
        <div className='col-md-4'>
            <input type='number' value={number} onChange={(e)=>setNumber(e.target.value)}/>
            <button className="btn btn-success" onClick={handleClick}>Bid</button>
            <LiveBids productId={product._id}/>
        </div>
        <div className='col-md-2'>
            <CountDownTimer biddingEnd={new Date(product.biddingEnd)}/>
        </div>
        </div>
    )
}