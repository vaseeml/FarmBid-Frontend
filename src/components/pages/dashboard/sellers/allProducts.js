import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import DataTable from "react-data-table-component"
import { Form, Col, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import {Modal ,Card ,Button } from 'react-bootstrap'
import axios from 'axios'
export default function AllProducts() {
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const [ modal , setModal ] = useState(false)
    const [ productBids , setProductBids ] = useState([])
    const { id } = useParams()
    const toggle = ()=>{
        setModal(true)
    }
    const profiles = useSelector((state) => {
        return state.admin.profiles.find((ele) => ele._id == id)
    })
    const filteredSearch = data.filter((ele) => ele.productName.toLowerCase().includes(search.toLowerCase()))
    useEffect(() => {
        (async () => {
            const response = await axios.get(`http://localhost:4000/api/seller/products/${profiles?.userId?._id}`, {
                headers: { 'Authorization': localStorage.getItem('token') }
            })
            setData(response.data)
        })()
    }, [])
    const handleViewBids = async(id)=>{
        toggle()
        try{
            const response = await axios.get(`http://localhost:4000/api/product/${id}/bids` , {
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            setProductBids(response.data)
        } catch(err){
            console.log(err)
        }
    }
    const columns = [
        {
            name: 'Name',
            selector: row => row.productName,
            sortable: true
        },
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true
        },
        {
            name: 'basePrice',
            selector: row => row.basePrice,
            sortable: true
        },
        {
            name: 'productImg',
            cell: (row) => <img src={`http://localhost:4000/${row.productImg}`} alt="User" style={{ width: '100px', height: '90px' }} />
        },
        {
            name:'details',
            cell:(row)=><button onClick={()=>handleViewBids(row._id)}>View Bids</button>
        }


    ]
    return (
        <div>
            <Row>
                <Col md={3}>
                    <Form >
                        <Form.Control
                            type='text'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search product name...'
                        />
                    </Form>
                </Col>
            </Row>
            <DataTable
                columns={columns}
                data={filteredSearch}
                pagination
            />
            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Bidding Info</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    
                        {
                           productBids.length == 0?<p>No Bids Placed Yet!</p>: 
                           <div>
                            {productBids.map((ele) => {
                                const statusVariant = ele.status === 'Lost' ? 'danger' : 'success';

                                return (
                                    <Row key={ele._id} className="d-flex justify-content-between align-items-center">
                                        <Col>Name: {ele.bidderId?.username}</Col>
                                        <Col>Amount: {ele.amount}Rs</Col>
                                        <Col className={`text-${statusVariant}`}>{ele.status === 'Lost' ? ele.status : 'Won'}</Col>
                                    </Row>
                                )
                            })}
                        </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}