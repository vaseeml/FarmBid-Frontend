import axios from "axios";
import { useParams } from "react-router-dom";
import { useState ,  useEffect } from 'react'
import DataTable from "react-data-table-component";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector } from 'react-redux'
export default function ViewCustomerBids(){
    const [ customerBids , setCustomerBids ] = useState([])
    const [ searchQuery , setSearchQuery ] = useState('')
    const [ bidder , setBidder ] = useState({})
    const [modal, setModal] = useState(false);
    const { id } = useParams()
    const bidders = useSelector((state)=>{
        return state.admin.profiles
    })
    const toggle = () => {
        setModal(!modal)
    }
    const filterSearchBids = customerBids.filter(ele=> ele.productId?.productName?.toLowerCase().includes(searchQuery.toLowerCase()))
    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get(`http://localhost:3000/api/buyer/${id}/bids` , {
                    headers:{
                        'Authorization':localStorage.getItem('token')
                    }
                })
                console.log('bids anubranth' , response.data)
                setCustomerBids(response.data)
            } catch(err){
                console.log(err)
            }
        })()
    },[])
    const handleView = (bidderId)=>{
        const bidder = bidders.find(ele=>ele.userId._id == bidderId)
        setBidder(bidder)
        toggle()
    }
    const columns=[
        {
            name:'Product Name',
            selector:row=>row.productId? row.productId.productName :'Not Available',
            sortable:true
        },
        {
            name:'Address of Farm',
            selector:row=>row.productId? row.productId.address : 'Not Available',
            sortable:true
        },
        {
            name:'Base Price',
            selector:row=>row.productId? row.productId.basePrice : 'Not Available',
            sortable:true
        },
        {
            name:'Bid Amount',
            selector:row=>row.amount || 'Not Available',
            sortable:true
        },
        {
            name:'Product Image',
            cell: (row) => <img src={`http://localhost:3000/${row.productId?.productImg}`} alt="User" style={{ width: '100px', height: '90px' }} />
        },
        {
            name:'Actions',
            cell: (row) => <button className='btn btn-primary' onClick={()=>handleView(row.bidderId)}>View Bidder</button>
        }
        
    ]
    return (
        <div>
            <h2>Total Bids Placed - {customerBids?.length}</h2>
            <input 
            type='text'
            placeholder='search by name...'
            value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            />
            <DataTable
                    columns={columns}
                    data={filterSearchBids}
                    pagination
            ></DataTable>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Bidder Profile</ModalHeader>
                <ModalBody>
                    <div>
                        <h4>{bidder?.name}</h4>
                        <p>{bidder?.email}</p>
                        <p>{bidder?.role}</p>
                    </div>
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