import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link} from 'react-router-dom'
import CountDownTimer from "./CountDownTimer"
import { removeProductFromLive  , addProductToCompleted} from "../../actions/product-actions"
import { useAuth } from "../../contexts/AuthContext"
import { Card, Button, Col , Row , Tooltip , OverlayTrigger, Container ,Carousel} from 'react-bootstrap';
import { FaClock } from 'react-icons/fa'
export default function LiveProducts(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useAuth()
    const products=useSelector((state)=>{
        return state.products.liveProducts
    })
    const handleClick = async(id)=>{
        if(user?.role == 'seller'){
            navigate(`/live/${id}/myProduct`)
        }
        if(user?.role == 'buyer'){
            navigate(`/live/${id}/bid`)
        }
    }
    const onBiddingEnd = (product)=>{
        console.log('product on bidding end' , product)
        //dispatching the action after bidding time ends to remove the product from the live section
        dispatch(addProductToCompleted(product))
        dispatch(removeProductFromLive(product))

    }
    console.log('live page ' ,products)
    return (
        <Container>
            <Row xs={1} md={3}>
                {products.map((ele) => (
                <Col key={ele._id}>
                    <Link to={user?.role === 'seller' ? `/live/${ele._id}/myProduct` : `/live/${ele._id}/bid`} style={{ textDecoration: 'none' }}>
                    <Card className="bg-light ml-4">
                        <Carousel interval={4000}>
                        <Carousel.Item>
                            <img
                            src={`http://localhost:3000/${ele.productImg}`}
                            alt="Product Image"
                            height="300px"
                            width="260px"
                            className="d-block w-100"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <video autoPlay muted loop className="d-block w-100" style={{ maxHeight: '300px' }}>
                            <source src={`http://localhost:3000/${ele.productVideo}`} type="video/mp4" />
                            </video>
                        </Carousel.Item>
                        </Carousel>
                        <Card.Body className="position-relative">
                        <div className="d-flex justify-content-start">
                            <Card.Title>Veg. Name: {ele.productName.toUpperCase()}</Card.Title>
                        </div>
                        <div className="d-flex justify-content-start mb-2">
                            <Card.Title>
                            <OverlayTrigger
                                placement="top"
                                overlay={
                                <Tooltip id={`tooltip-seller-${ele._id}`}>
                                    Seller Details: {ele.sellerId?.email || 'seller info not available'}
                                </Tooltip>
                                }
                            >
                                <span>Farmer Ph:{ele.sellerId?.phone || 'seller'}</span>
                            </OverlayTrigger>
                            </Card.Title>
                        </div>
                        <div className="mb-2">Quantity: {ele.stock}</div>
                        <div className="d-flex align-items-center position-absolute top-0 end-0">
                            {ele.biddingEnd ?
                            <CountDownTimer biddingEnd={new Date(ele.biddingEnd)} onBiddingEnd={() => onBiddingEnd(ele)} />
                            : <span className="bg-info text-dark p-1 rounded">Bidding Not Started</span>
                            }
                        </div>
                        </Card.Body>
                        <Button variant="primary" size="sm" className="align-self-center" style={{ width: '200px' }} onClick={() => handleClick(ele._id)}>
                        {user?.role === 'buyer' ? 'Bid' : 'View Details'}
                        </Button>
                    </Card>
                    </Link>
                </Col>
                ))}
            </Row>
        </Container>

    )
}