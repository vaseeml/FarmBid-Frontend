import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Row, Col, Card, Button } from 'react-bootstrap'
export default function Home(){
    const navigate=useNavigate()
    const products = useSelector((state)=>{
        // state is object which has products objects
        return state.products
    })
    const handleClick=()=>{
        navigate('/loginpage')
    }
    return (
        <Row className="mx-4 my-4">
        {products.data.map((ele) => (
            <Col key={ele._id} xs={2}>
                <Card style={{ width: '14rem' }}>
                    <Card.Img
                        variant="top"
                        src={`http://localhost:4000/${ele.productImg}`}
                        alt="Product Image"
                        height="200px"
                        width="260px"
                    />
                    <Card.Body>
                        <Card.Title>{ele.productName}</Card.Title>
                        <Card.Text>Base Price - {ele.basePrice}Rs</Card.Text>
                        <Button variant="primary" onClick={handleClick}>Bid</Button>
                    </Card.Body>
                </Card>
            </Col>
        ))}
    </Row>
    )
}