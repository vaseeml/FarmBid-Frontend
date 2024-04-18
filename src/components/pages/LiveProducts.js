import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
export default function LiveProducts(){
    const navigate = useNavigate()
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
                    </div>
                    <button className="btn btn-primary" onClick={()=>handleClick(ele._id)}>{auth.role == 'buyer'?'Bid':'View Details'}</button>
                    </div>
                ))}
        </div>
    )
}