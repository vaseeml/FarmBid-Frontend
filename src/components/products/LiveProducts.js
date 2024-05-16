import { useDispatch, useSelector } from "react-redux"
import { useState , useEffect } from "react"
import { useNavigate, Link} from 'react-router-dom'
import CountDownTimer from "./CountDownTimer"
import { removeProductFromLive  , addProductToCompleted, getStartLiveProducts} from "../../actions/product-actions"
import { useAuth } from "../../contexts/AuthContext"
import { Card, Button, Col , Row , Tooltip , OverlayTrigger, Container ,Carousel} from 'react-bootstrap';
import SearchCity from "./SearchCity"

export default function LiveProducts(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ page , setPage ] = useState(1) // initial page number 
    // const [ isLoading , setIsLoading ] = useState(false)
    const limit = 8 // products per page
    const { user } = useAuth()
    const products=useSelector((state)=>{
        return state.products.liveProducts
    })
    const city = useSelector((state)=>{
        return state.products.setCity
    })
    const filteredProducts = products.filter((ele)=>{
        if(city){
            return ele.cities == city
        }else{
            return ele
        }
    })
    const handleClick = async(id)=>{
        if(user?.role === 'seller'){
            navigate(`/live/${id}/myProduct`)
        }
        if(user?.role === 'buyer'){
            navigate(`/live/${id}/bid`)
        }
    }
    const onBiddingEnd = (product)=>{
        // console.log('product on bidding end' , product)
        //dispatching the action after bidding time ends to remove the product from the live section
        dispatch(addProductToCompleted(product))
        dispatch(removeProductFromLive(product))

    }
    useEffect(()=>{
        window.addEventListener('scroll' , handleScroll)
        return ()=>{
            window.removeEventListener('scroll' , handleScroll)
        }
    } , [])
    useEffect(()=>{
        // setIsLoading(true)
        dispatch(getStartLiveProducts({role:user?.role , page:page , limit:limit}))
    }, [page])
    const handleScroll = ()=>{
        const { scrollTop , scrollHeight , clientHeight } = document.documentElement
        if(scrollTop + clientHeight >= scrollHeight - 5){
            setPage(prev=>prev+1) // incrementing the page number
        }
    }
    return (
        <>
        <SearchCity/>
        { products.length !== 0 ?<Container>
            <Row xs={1} md={4}>
                {filteredProducts.map((ele) => (
                    <Col key={ele._id}>
                    <Link to={user?.role === 'seller' ? `/live/${ele._id}/myProduct` : `/live/${ele._id}/bid`} style={{ textDecoration: 'none' }}>
                    <Card className="bg-light mt-4 ml-4" key={ele._id}>
                        <Carousel interval={3000} controls={false} indicators={false}>
                        
                            {ele.productImg.map((ele)=>{
                            return <Carousel.Item>
                                <img
                                src={`http://localhost:4000/${ele}`}
                                alt="Product Image"
                                height="250px"
                                // width="200px"
                                className="d-block w-100"
                                />
                                </Carousel.Item>
                            })}
                            
                        
                        <Carousel.Item>
                            <img
                            src={`http://localhost:4000/${ele.productImg}`}
                            alt="Product"
                            height="250px"
                            // width="200px"
                            className="d-block w-100"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <video autoPlay muted loop className="d-block w-100" style={{ height: '250px' }}>
                            <source src={`http://localhost:4000/${ele.productVideo}`} type="video/mp4" />
                            </video>
                        </Carousel.Item>
                        </Carousel>
                        <Card.Body className="position-relative">
                        <div className="d-flex justify-content-start">
                            <Card.Title>Veg. Name: {ele.productName.toUpperCase()}</Card.Title>
                        </div>
                        { user?.role === 'buyer' && <div className="d-flex justify-content-start mb-2">
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
                        </div>}
                        <div className="mb-2">Base Price: {ele.basePrice}Rs</div>
                        <div className="mb-1">Quantity: {ele.stock}basket || Weight: {ele.weight?ele.weight:'Not Mentioned'}kgs (per 1 basket)</div>
                        <div className="d-flex align-items-center position-absolute top-0 end-0">
                            {ele.biddingEnd ?
                            <CountDownTimer biddingEnd={new Date(ele.biddingEnd)} onBiddingEnd={() => onBiddingEnd(ele)} />
                            : <span className="bg-warning text-dark p-1 rounded">Place First Bid</span>
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
        </Container>:<h4>No Products/Vegetable found</h4>}
        </>
    )
}