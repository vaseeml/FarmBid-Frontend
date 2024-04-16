import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet , faChartLine } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startWalletUpdate } from '../../actions/user-actions'
import axios from 'axios'
export default function Sections(){
    const [modal, setModal] = useState(false);
    const [ updateAmount , setUpdateAmount ] = useState('')
    const [ wallet , setWallet ] = useState(null)
    const toggle = () => {
        setModal(!modal)
    }
    const dispatch = useDispatch()
    const handleUpdateAmount = async(e)=>{
        e.preventDefault()
       dispatch(startWalletUpdate(updateAmount)) 
    }
    const handleWallet = async()=>{
        const response = await axios.get('http://localhost:3000/api/wallet' , {headers:{
            'Authorization':localStorage.getItem('token')
        }})
        console.log(response.data)
        setWallet(response.data)
        toggle()
        
    }
    return (
        <div className='row'>
            <div className='col-md-3'><Link to='/live'>Live</Link></div>
            <div className='col-md-3'><Link to='/upcoming'>UpComing</Link></div>
            <div className='col-md-3'><Link to='/completed'>Completed</Link></div>
            <div onClick={handleWallet} className='col-md-2 d-flex align-items-center justify-content-end'>
                <FontAwesomeIcon icon={faWallet} size="2x" color="brown" />
            </div>
            <div className='col-md-1 d-flex align-items-center'>
                <FontAwesomeIcon icon={faChartLine} size="2x" color="green" />
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Edit Product</ModalHeader>
                <ModalBody>
                    <h2>Balance - {wallet?.balance}</h2>
                    <Form onSubmit={handleUpdateAmount}>
                        <Form.Group controlId="walletAmount">
                        <Form.Label>Enter Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter amount"
                            value={updateAmount}
                            onChange={(e) => setUpdateAmount(e.target.value)}
                        />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                        Add
                        </Button>
                    </Form>

                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={toggle}>
                    Do Something
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
        </div>
        
    )
}