// import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { useState, useEffect } from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
export default function BlockedSellers() {
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const filteredSearch = data?.filter((ele) => ele.username.toLowerCase().includes(search.toLowerCase()))
    useEffect(() => {
        try {
            (async () => {
                const response = await axios.get(`http://localhost:3000/api/seller/blocked`, {
                    headers: { 'Authorization': localStorage.getItem('token') }
                })
                setData(response.data)
                console.log(response.data)
            })()
        } catch (err) {
            console.log(err)
        }
    }, [])
    const handleClick = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/unblock/${id}`, { isBlock: 'false' }, {
                headers: { 'Authorization': localStorage.getItem('token') }
            })
            const updatedProfiles = data.filter((ele) => ele._id !== response.data._id)
            setData(updatedProfiles)

        } catch (err) {
            console.log(err)
        }
    }
    const columns = [
        {
            name: 'Name',
            selector: row => row.username,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true
        },
        {
            name: 'role',
            selector: row => row.role,
            sortable: true
        },
        {
            name: 'Action',
            selector: row => row.isBlock ? <button className='btn btn-success' onClick={() => { handleClick(row._id) }}>UnBlock</button> : 'unexpected'
        }

    ]
    // const staticData=[cdata]
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
            <h2>Blocked Sellers</h2>
            <DataTable
                columns={columns}
                data={filteredSearch}
                pagination
            ></DataTable>

        </div>
    )
}