import { useDispatch, useSelector } from 'react-redux'
import {Modal ,Card ,Button , Carousel} from 'react-bootstrap'
import { useState , useEffect } from 'react'
import axios from 'axios'
// import SearchCity from './SearchCity'
import { useAuth } from '../../contexts/AuthContext'
import { getStartCompletedProducts } from '../../actions/product-actions'
export default function CompletedProducts(){
    const [showModal, setShowModal] = useState(false)
    const [ buyerInfo , setBuyerInfo ] = useState({})
    const [displayImage, setDisplayImage] = useState(true)
    const [ page , setPage ] = useState(1) // initial page number 
    const [ isLoading , setIsLoading ] = useState(false)
    const limit = 8 // products per page
    const completedProducts = useSelector((state)=>{
        return state.products?.completedProducts
    })
    const {user} = useAuth()
    const dispatch = useDispatch()
    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 5000, // Set the autoplay speed (in milliseconds),
    //     beforeChange: (current, next) => {
    //         // Toggle between displaying image and video every 5 seconds
    //         if ((next + 1) % 2 === 0) {
    //             setTimeout(() => {
    //                 setDisplayImage(true)
    //             }, 5000)
    //         } else {
    //             setTimeout(() => {
    //                 setDisplayImage(false)
    //             }, 5000)
    //         }
    //     },
    // };
    const handleShowBuyerInfo = async(id) => {
      setShowModal(!showModal)
      try{
        const response = await axios.get(`http://localhost:3000/api/order/${id}/product` , {
          headers:{
            "Authorization":localStorage.getItem('token')
          }
        })
        // console.log(response.data)
        setBuyerInfo(response.data)
      } catch(err){
        console.log(err)
      }
    };
    const handleTimeShow = (createdAt)=>{
      const date = new Date(createdAt)
      const indianTime = date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      return indianTime
    }
    useEffect(()=>{
      window.addEventListener('scroll' , handleScroll)
      return ()=>{
          window.removeEventListener('scroll' , handleScroll)
      }
    } , [])
    useEffect(()=>{
        // setIsLoading(true)
        dispatch(getStartCompletedProducts({role:user?.role , page:page , limit:limit}))
    }, [page])
    const handleScroll = ()=>{
        const { scrollTop , scrollHeight , clientHeight } = document.documentElement
        if(scrollTop + clientHeight >= scrollHeight - 5){
            setPage(prev=>prev+1) // incrementing the page number
        }
    }
    // console.log('completed products',completedProducts)
    return (
      <div className="row">
      {
        completedProducts.map((ele) => (
          <div className="col-md-3 mb-5 mt-4 ml-3" key={ele._id}>
            <Card style={{ margin: '0 10px' }}>
              <Carousel interval={3000} controls={false} indicators={false}>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={`http://localhost:3000/${ele.productImg}`}
                    alt="Product Image"
                    style={{ height: '250px' }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <video controls autoPlay muted  className="d-block w-100" style={{ height: '250px' }}>
                    <source src={`http://localhost:3000/${ele.productVideo}`} type="video/mp4" />
                  </video>
                </Carousel.Item>
              </Carousel>
              <Card.Body>
                <Card.Title>Veg.Name: {ele.productName.toUpperCase()}</Card.Title>
                <Card.Text>Base Price: {ele.basePrice}Rs</Card.Text>
                <Card.Text>Listed On: {handleTimeShow(ele.createdAt)}</Card.Text>
                <Button onClick={() => handleShowBuyerInfo(ele._id)} variant="primary">Details</Button>
              </Card.Body>
            </Card>
          </div>
        ))
      }
       <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Bidder Info  {user?._id == buyerInfo?.bidder?._id ? <p className='btn btn-success'>Won</p>:<p className='btn btn-danger'>Lost</p>}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
              <p>Bidder Name: {buyerInfo.bidder?.username}</p>
              {/* <p>Email: {buyerInfo.bidder?.email}</p> */}
              { user?._id == buyerInfo?.bidder?._id &&<span style={{color:'yellow' , backgroundColor:'black'}}>Order Id: {buyerInfo._id}</span>}
              <p>Last Bid: {buyerInfo.bidAmount}</p>
              <p>Bid Date: {handleTimeShow(buyerInfo.createdAt)}</p>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>

    )
}