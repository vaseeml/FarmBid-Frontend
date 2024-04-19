import { useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { useState } from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
export default function Sellers() {
    const navigate = useNavigate()
    const profiles = useSelector((state) => {
        return state.admin.profiles.filter(ele => ele.userId?.role == 'seller')
    })
    const [search, setSearch] = useState('')
    const filteredSearch = profiles.filter((ele) => ele.name.toLowerCase().includes(search.toLowerCase()))
    const handleClick = (id) => {
        navigate(`/view/${id}/seller`)
    }
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true
        },
        {
            name: 'description',
            selector: row => row.description,
            sortable: true
        },
        {
            name: 'image',
            cell: (row) => <img src={`http://localhost:3000/${row.image}`} alt="User" style={{ width: '100px', height: '90px' }} />
        },
        {
            name: 'Actions',
            cell: (row) => <button onClick={() => handleClick(row._id)}>Details</button>
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
            <h2>Total Sellers</h2>
            <DataTable
                columns={columns}
                data={filteredSearch}
                pagination
            ></DataTable>

        </div>
    )
}