import { useSelector } from 'react-redux'
import {Modal ,Card ,Button , Carousel} from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
export default function CompletedProducts(){
    const [showModal, setShowModal] = useState(false)
    const [ buyerInfo , setBuyerInfo ] = useState({})
    const [displayImage, setDisplayImage] = useState(true)
    const completedProducts = useSelector((state)=>{
        return state.products?.completedProducts
    })
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000, // Set the autoplay speed (in milliseconds),
        beforeChange: (current, next) => {
            // Toggle between displaying image and video every 5 seconds
            if ((next + 1) % 2 === 0) {
                setTimeout(() => {
                    setDisplayImage(true)
                }, 5000)
            } else {
                setTimeout(() => {
                    setDisplayImage(false)
                }, 5000)
            }
        },
    };
    const handleShowBuyerInfo = async(id) => {
      setShowModal(!showModal)
      try{
        const response = await axios.get(`http://localhost:3000/api/order/${id}/product` , {
          headers:{
            "Authorization":localStorage.getItem('token')
          }
        })
        console.log(response.data)
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
    return (
      <div className="row">
      {
        completedProducts.map((ele) => (
          <div className="col-md-3 mb-3 mt-4 ml-4" key={ele._id}>
            <Card style={{ margin: '0 10px' }}>
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={`http://localhost:3000/${ele.productImg}`}
                    alt="Product Image"
                    style={{ height: '300px' }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <video controls autoPlay muted  className="d-block w-100" style={{ height: '300px' }}>
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
          <Modal.Title>Bidded Amout - {buyerInfo.bidAmount}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
              <p>Name: {buyerInfo.bidder?.username}</p>
              <p>Email: {buyerInfo.bidder?.email}</p>
              <p>Phone: {buyerInfo.bidder?.phone}</p>
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