import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Card } from 'reactstrap'
import { FaBell } from 'react-icons/fa';
export default function CartItem({ item , removeProduct}){
    const navigate = useNavigate()
    const handleClick = async(id)=>{
        // asking the confirmation from the user
        const confirm = window.confirm('Are You Sure? You Want To Remove From Cart')
        if(confirm){
            try{
                // making delete request of cart item
                const response = await axios.delete(`http://localhost:3000/api/cart/${id}` , {
                    headers:{
                        'Authorization':localStorage.getItem('token')
                    }
                })
                // seding only the id from the response
                removeProduct(response.data._id)
            } catch(err){
                console.log(err)
            }
        }
    }
    const handleBid = (productId)=>{
        navigate(`/live/${productId}/bid`)
    }
    return (
        <div className="col-md-4 mb-3">
        <div className="card">
          <img src={`http://localhost:3000/${item.product?.productImg}`} 
            className="card-img-top"  
            height="300px"
            width="260px"
            alt="Product" />
          <div className="card-body">
            <h5 className="card-title">{item.product?.productName}</h5>
            <p className="card-text">Stock: {item.product?.stock}</p>
            <p className="card-text">Base Price: {item.product?.basePrice}</p>
            <button className="btn btn-danger" onClick={() => handleClick(item._id)}>Remove Cart</button>
            {/* <FaBell size={30} /> */}
            <button className="btn btn-success" onClick={() => handleBid(item.product?._id)} disabled={item.product?.biddingStart > item.product?.biddingEnd}>Bid</button>
          </div>
        </div>
      </div>
    )
}