import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import CountDownTimer from "./CountDownTimer"
import { removeProductFromLive  , addProductToCompleted} from "../../actions/product-actions"
export default function LiveProducts(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const products=useSelector((state)=>{
        return state.products.liveProducts
    })
    const auth=useSelector((state)=>{
        return state.auth.data
    })
    const handleClick = async(id)=>{
        if(auth.role == 'seller'){
            navigate(`/live/${id}/myProduct`)
        }
        if(auth.role == 'buyer'){
            navigate(`/live/${id}/bid`)
        }
    }
    const onBiddingEnd = (productId)=>{
        // console.log('onbidding end')
        // // dispatching the action after bidding time ends to remove the product from the live section
        // dispatch(addProductToCompleted(productId)).then(()=>{
        //     dispatch(removeProductFromLive(productId))
        // })
    }
    return (
        <div>
            {products.map((ele) => (
                    <div key={ele._id} className="col-md-4">
                    <div>
                    <img
                            src={`http://localhost:3000/${ele.productImg}`} alt='img'
                            height='300px' width='260px'
                        />
                    
                    <div className="card-body"><h3 className="card-title">{ele.productName}</h3>
                    {/* <video controls height='300px' width='260px'>
                            <source
                            key={ele._id}
                            src={`http://localhost:3000/${ele.productVideo}`}
                            />
                        </video> */}
                    <p className="card-text">{ele.sellerId?.phone}</p></div>
                    {ele.biddingEnd ? <CountDownTimer biddingEnd={new Date(ele.biddingEnd)} onBiddingEnd={()=>onBiddingEnd(ele._id)}/> : <span>Bidding Not Started</span>}
                    </div>
                    <button className="btn btn-primary" onClick={()=>handleClick(ele._id)}>{auth.role == 'buyer'?'Bid':'View Details'}</button>
                    </div>
                ))}
        </div>
    )
}