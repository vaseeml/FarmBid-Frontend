import axios from 'axios'
export default function CartItem({ item , removeProduct}){
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
    const handleBid = ()=>{
        // codes goes here...
        console.log('bidding')
    }
    return (
        <div>
            <img src={`http://localhost:3000/${item.product?.productImg}`} alt="product"/>
            <h4>{item.product?.productName}</h4>
            <button className="btn btn-danger" onClick={()=>handleClick(item._id)}>Remove Cart</button>
            <button  className="btn btn-success" disabled={new Date(item.product?.biddingStart) < new Date()} onClick={()=>handleBid(item.product?._id)}>Bid</button>
        </div>
    )
}