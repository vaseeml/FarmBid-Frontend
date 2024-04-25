import axios from "axios"
import { useEffect , useState } from "react"
import { useParams } from 'react-router-dom'
import io from 'socket.io-client';
import LiveBids from "./LiveBids";
import Bid from "./Bid";
import CountDownTimer from '../../products/CountDownTimer';
import { useSelector } from 'react-redux'

const socket = io('http://localhost:3000')
export default function BidContainer(){
    const [ previousBids , setPreviousBids ] = useState([])
    const { id }  = useParams()
    const product = useSelector((state)=>{
        return state.products.liveProducts.find(ele=>ele._id == id)
    })
    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get(`http://localhost:3000/api/product/${id}/bids` , {
                    headers:{
                        'Authorization':localStorage.getItem('token')
                    }
                })
                setPreviousBids(response.data)
            } catch(err){
                console.log(err)
            }
        })()
    } , [])
    useEffect(()=>{
        socket.emit('joinProductRoom' , id)
        return ()=>{
            socket.off('bidUpdate')
        }
    } , [])
    useEffect(()=>{
        socket.on('newBid', (bidData)=>{
        console.log('Received bid update' , bidData)
        // setPreviousBids([...previousBids , bidData])
        setPreviousBids(prevBid =>[...prevBid , bidData])
        })

        return ()=>{
            socket.off('bidUpdate')
            socket.emit('leaveProductRoom' , id)
        }
    } , [])
    const updateLatestBids = (bidData)=>{
        setPreviousBids(prevBid =>[...prevBid , bidData])
    }
    console.log('state ',previousBids)
    return (
        <div className="row">
            <div className="col-md-4">
                <Bid product={product}/>
            </div>
            <div className="col-md-4">
                <LiveBids productId={id} previousBids={previousBids} updateLatestBids={updateLatestBids}/>
            </div>
            <div className="col-md-4">
                <CountDownTimer biddingEnd={new Date(product?.biddingEnd)}/>
            </div>
        </div>
    )
}