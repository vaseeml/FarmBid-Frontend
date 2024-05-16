import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CountDownTimer from '../../products/CountDownTimer'
import { Row, Col, Card } from 'react-bootstrap';
import LiveBids from './LiveBids'
export default function MyProduct(){
    // using useParams to get id from the url
    const { id } = useParams()
    // getting product data from redux store
    const product = useSelector((state)=>{
        return state.products.liveProducts.find(ele=>ele._id == id)
    })
    return (
        <Row className='justify-content-center'>
        <Col md={4}>
          <Card>
            <Card.Img
             src={`http://localhost:4000/${product?.productImg}`} alt='img' height='300px' width='260px'
            />
            <Card.Body>
              <h3 className="card-title">{product?.productName}</h3>
              <p className="card-text">Base Price - {product?.basePrice}</p>
              {/* <p className="card-text">Farmer - {product?.sellerId?.name}</p> */}
              <p className="card-text">Mobile Number - {product?.sellerId?.phone}</p>
              <p className="card-text">Stock - {product?.stock}</p>
              <p className="card-text">Address - {product?.address}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
        <CountDownTimer biddingEnd={new Date(product?.biddingEnd)} />
          <LiveBids productId={product?._id} />
        </Col>
      </Row>
            
                    // <div key={product?._id} className="col-md-4">
                    //     <CountDownTimer biddingEnd={new Date(product?.biddingEnd)}/>
                    // <div>
                    // <img
                    //         src={`http://localhost:4000/${product?.productImg}`} alt='img'
                    //         height='300px' width='260px'
                    //     />
                    
                    // <div className="card-body"><h3 className="card-title">{product?.productName}</h3>
                    // {/* <video controls height='300px' width='260px'>
                    //         <source
                    //         key={product._id}
                    //         src={`http://localhost:3000/${product.productVideo}`}
                    //         />
                    //     </video> */}
                    // <p className="card-text">{product?.sellerId?.phone}</p></div>
                    // </div>
                    // <p>Base Price - {product?.basePrice}</p>
                    // <p>Farmer - {product?.sellerId?.name}</p>
                    // <p>Mobile Number - {product?.sellerId?.phone}</p>
                    // <p>Stock - {product?.stock}</p>
                    // <p>Address - {product?.address}</p>
                    // <div>
                    //     <LiveBids productId={product?._id}/>
                    // </div>
                    // </div>
    )
}