import swal from 'sweetalert'
import { useState } from 'react'
import { Tooltip , OverlayTrigger } from 'react-bootstrap';
import axios from 'axios'
import io from 'socket.io-client'
import { useAuth } from '../../../contexts/AuthContext'
import { useDispatch } from 'react-redux'
import { setUpdateWallet } from '../../../actions/user-actions'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux'

const socket = io('http://localhost:3000')
export default function LiveBids({ productId ,previousBids, updateLatestBids}){
    const [ number , setNumber ] = useState('')
    const [ serverErrors , setServerErrors ] = useState({}) 
    const [showModal, setShowModal] = useState(false)
    const [ profile , setProfile ] = useState(null)
    const wallet = useSelector((state) => {
        return state.user?.wallet
    })
    const handleBidderClick =async(id) => {
        // Show modal when bidder's name is clicked
        setShowModal(true)
        try{
            const response = await axios.get(`http://localhost:3000/api/get/profileImage/${id}`)
            console.log(response.data)
            setProfile(response.data)
        } catch(err){
            console.log(err)
        }
    }
    const dispatch = useDispatch()
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
        // if(wallet?.balance > Number(number)){
        //     swal('You Dont Have Enough Balance To Bid!' , `Balance ${wallet?.balance}`, 'danger')
        // }else{
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
                dispatch(setUpdateWallet(response.data.amount))
                swal('Bid Placed!', `amount ${response.data.amount}` , 'success')
                setNumber('')
                setServerErrors({})
            } catch(err){
                console.log(err)
                setServerErrors(err.response.data)
            }
        // }
    }
    return (
        <div className='list-group'>
        <h3>Previous Bids</h3>
        <div  style={{height: '400px', overflowY: 'scroll'}}>
            {/* Display list of previous bids */}
            <ul>
            {previousBids.length !== 0? previousBids.map((bid) => (
                <li className={`list-group-item ${bid.bidderId?.role === 'buyer' ? 'buyer' : 'seller'}`}
                    key={bid._id}
                >

                <div className="d-flex w-100 justify-content-between align-items-center">
                <h5>name:
                    <button onClick={()=>handleBidderClick(bid.bidderId?._id)} className='btn btn-success rounded'>
                        {bid.bidderId?.username == user?.username ?'You' :bid.bidderId?.username}
                    </button>
                </h5>
                <small>{formatTimestamp(bid.createdAt)}</small>
                {/* <small>{bid.createdAt}</small> */}
                </div>
                <p className="mb-1">Bid Amount: {bid.amount}</p>
            </li>
            )) :<span >No Bids Placed</span>}
            </ul>
        </div>
        {user?.role == 'buyer' && (
            <div >
            <input type='number' value={number} onChange={(e)=>setNumber(e.target.value)} className='form-control'/>
            <button className="btn btn-success form-control" onClick={handleClick}>Bid</button>
            { Object.keys(serverErrors).length !== 0 && <p style={{color:'red'}}>{serverErrors.error}</p>}
            </div>
        )}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile Details</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Profile Picture */}
                    <div style={{ marginRight: '20px' }}>
                        <img src={`http://localhost:3000/${profile?.path}`} alt="Profile Pic" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                    </div>
                    <div>
                        <h5>name - {profile?.name}</h5>
                        <p>address - {profile?.address}</p>
                        <p>bio - {profile?.description}</p>
                    </div>
                </Modal.Body>
                {/* <Modal.Body>
                <div style={{ textAlign: 'center' }}>
                    <img src={`http://localhost:3000/${profile?.path}`} alt="Profile Pic" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <h5>{profile?.name}</h5>
                </div>
                </Modal.Body> */}
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
        </Modal>
        </div>
    )
}