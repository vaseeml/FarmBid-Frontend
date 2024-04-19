import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import DataTable from "react-data-table-component"
import { Form, Col, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import axios from 'axios'
export default function AllProducts() {
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const { id } = useParams()
    const profiles = useSelector((state) => {
        return state.admin.profiles.find((ele) => ele._id == id)
    })
    const filteredSearch = data.filter((ele) => ele.productName.toLowerCase().includes(search.toLowerCase()))
    useEffect(() => {
        (async () => {
            const response = await axios.get(`http://localhost:3000/api/seller/products/${profiles?.userId?._id}`, {
                headers: { 'Authorization': localStorage.getItem('token') }
            })
            setData(response.data)
        })()
    }, [])

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
            cell: (row) => <img src={`http://localhost:3000/${row.productImg}`} alt="User" style={{ width: '100px', height: '90px' }} />
        },


    ]
    return (
        <div>
            <Row className="justify-content-md-center">
                <Col md={3}>
                    <Form >
                        <Form.Control
                            type='text'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search'
                        />
                    </Form>
                </Col>
            </Row>
            <DataTable
                columns={columns}
                data={filteredSearch}
                pagination
            />
        </div>
    )
}