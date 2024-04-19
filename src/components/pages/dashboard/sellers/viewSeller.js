import { useSelector } from "react-redux"
import { useParams, Link, useNavigate } from "react-router-dom"
import React from 'react';
import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
export default function ViewSeller() {
    const navigate = useNavigate()
    const { id } = useParams()
    const profiles = useSelector((state) => {
        return state.admin.profiles.find((ele) => ele._id == id)
    })
    const handleBlock = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/block/${id}`, { isBlock: 'true' }, {
                headers: { 'Authorization': localStorage.getItem('token') }
            })
            console.log(response.data)
            navigate('/blocked/sellers')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <Card style={{ borderColor: '#4A90E2' }}>
                            <Card.Header as="h2" className="d-flex justify-content-between align-items-center">
                                <span style={{ color: 'black' }}>Seller Details</span>
                                <Dropdown>
                                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                                        Actions
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={`/view/${id}/products`}>View Products</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { handleBlock(profiles?.userId?._id) }}>Block Seller</Dropdown.Item>
                                        {/* Add more dropdown items here if needed */}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text><strong style={{ color: 'black' }}>Name:</strong> {profiles && profiles.name}</Card.Text>
                                <Card.Text><strong style={{ color: 'black' }}>Email:</strong> {profiles && profiles.userId.email}</Card.Text>
                                <Card.Text><strong style={{ color: 'black' }}>Phone:</strong> {profiles && profiles.phone}</Card.Text>
                                <Card.Text><strong style={{ color: 'black' }}>Role:</strong> {profiles && profiles.userId.role}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}