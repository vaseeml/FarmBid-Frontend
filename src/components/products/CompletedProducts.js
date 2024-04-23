import { useSelector } from 'react-redux'
import { Container, Row, Col, Card ,Button , Carousel} from 'react-bootstrap'
import { useState } from 'react'
import Slider from 'react-slick';
export default function CompletedProducts(){
    
    // State to track whether to display image or video
    const [displayImage, setDisplayImage] = useState(true);
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
                    setDisplayImage(true);
                }, 5000);
            } else {
                setTimeout(() => {
                    setDisplayImage(false);
                }, 5000);
            }
        },
    };
    return (
    // <Container>
    //   <Row>
    //     {completedProducts.map((ele) => (
    //       <Col key={ele._id} className="mb-3">
    //         <Card style={{ height: '200px' }}>
    //           <Card.Img 
    //             src={`http://localhost:3000/${ele.productImg}`}
    //             alt="Product Image" 
    //             style={{ maxHeight: '100%', width: 'auto', maxWidth: '100px' }} 
    //           />
    //           <Card.Body>
    //             <Card.Title>Vegetable Name: {ele.productName}</Card.Title>
    //             <div className="d-flex ">
    //               <span className='bg-primary text-dark p-1 rounded me-3'>Units: {ele.stock}</span>
    //               <span className='bg-warning text-dark p-1 rounded me-3'>Base Price: {ele.basePrice}</span>
    //               <span className="bg-light rounded text-muted me-3">Seller Ph: {ele.sellerId?.phone}</span>
    //             </div>
    //             <div className="mt-auto">
    //               <Button variant="primary">View Details</Button>
    //             </div>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     ))}
    //   </Row>
    // </Container>
   

        // <div>
        //     {
        //         completedProducts.map((ele)=>{
        //             return <div key={ele._id} className="col-md-4">
        //             <div>
        //             <img
        //                     src={`http://localhost:3000/${ele.productImg}`} alt='img'
        //                     height='300px' width='260px'
        //                 />
                    
        //             <div className="card-body"><h3 className="card-title">{ele.productName}</h3>
        //             <video controls height='300px' width='260px'>
        //                     <source
        //                     key={ele._id}
        //                     src={`http://localhost:3000/${ele.productVideo}`}
        //                     />
        //                 </video>
        //             <p className="card-text">{ele.sellerId?.phone}</p></div>
        //             </div>
                
        //             </div>
        //         })
        //     }
        // </div>
        <div className="row">
      {
        completedProducts.map((ele) => (
          <div className="col-md-4 mb-3" key={ele._id}>
            <Card>
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={`http://localhost:3000/${ele.productImg}`}
                    alt="Product Image"
                    style={{ maxHeight: '300px' }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <video controls autoPlay muted  className="d-block w-100" style={{ maxHeight: '300px' }}>
                    <source src={`http://localhost:3000/${ele.productVideo}`} type="video/mp4" />
                  </video>
                </Carousel.Item>
              </Carousel>
              <Card.Body>
                <Card.Title>{ele.productName}</Card.Title>
                <Card.Text>{ele.sellerId?.phone}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))
      }
    </div>

    )
}