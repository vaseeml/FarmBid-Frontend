import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet , faChartLine } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
export default function Sections(){
    const [modal, setModal] = useState(false);
    const [ updateAmount , setUpdateAmount ] = useState('')
    const wallet = useSelector((state)=>{
        return state.user?.wallet
    })
    const toggle = () => {
        setModal(!modal)
    }
    const handleUpdateAmount = async(e)=>{
        // preventing page reload
        e.preventDefault()
        const formData = {
            amount:updateAmount,
            walletId:wallet._id
        }
        try{
            // post request for making payment
            const response = await axios.post('http://localhost:3000/api/create-checkout-session' ,formData, { headers:{
                'Authorization':localStorage.getItem('token')
            }})
            // setting the localStorage stripe id with response
            localStorage.setItem('stripeId' , response.data.id)
            // taking to the payment page with url by stripe
            window.location = response.data.url
        } catch(err){
            console.log(err)
        }
    }
    return (
        <div className='row'>
            <div className='col-md-3'><Link to='/live'>Live</Link></div>
            <div className='col-md-3'><Link to='/upcoming'>UpComing</Link></div>
            <div className='col-md-3'><Link to='/completed'>Completed</Link></div>
            <div onClick={toggle} className='col-md-2 d-flex align-items-center justify-content-end'>
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