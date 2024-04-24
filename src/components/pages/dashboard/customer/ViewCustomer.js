import { useSelector } from "react-redux";
import { useParams , useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ViewCustomer(){
    const { id } = useParams()
    const navigate= useNavigate()
    const customer = useSelector((state)=>{
        return state.admin.profiles.find(ele=>ele._id == id)
    })
    const handleViewBids = ()=>{
        navigate(`/customer/${customer.userId._id}/bids`)
    }
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card style={{ borderColor: '#4A90E2' }}>
                        <Card.Header as="h2" className="d-flex justify-content-between align-items-center">
                            <span style={{ color: 'black' }}>Account Details</span>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    Actions
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleViewBids}>View Bids</Dropdown.Item>
                                    {/* Add more dropdown items here if needed */}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text><strong style={{ color: 'black' }}>Name:</strong> { customer?.name}</Card.Text>
                            <Card.Text><strong style={{ color: 'black' }}>Email:</strong> {customer?.userId?.email}</Card.Text>
                            <Card.Text><strong style={{ color: 'black' }}>Phone:</strong> {customer?.phone}</Card.Text>
                            <Card.Text><strong style={{ color: 'black' }}>Role:</strong> {customer?.userId?.role}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}