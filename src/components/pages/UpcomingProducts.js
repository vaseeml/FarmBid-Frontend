import { useSelector } from 'react-redux'
import axios from 'axios'
export default function UpcomingProducts(){
    const upcomingProducts = useSelector((state)=>{
        return state.products?.upcomingProducts
    })
    const auth = useSelector((state)=>{
        return state.auth?.data
    })
    const handleClick = async(id)=>{
        // checking the role before making api requests
        if(auth?.role == 'buyer'){
            try{
                const formData = {
                    product:id,
                    user:auth.id
                }
                // if buyer add item to cart
                const response = await axios.post('http://localhost:3000/api/cart' ,formData, {
                    headers:{
                        'Authorization':localStorage.getItem('token')
                    }
                })
                console.log('added to cart' , response.data)
            }catch(err){
                console.log(err)
            }
        }
        else{
            // for a reason
            alert('No Route Found')
        }
    }
    return (
        <div>
            {
                upcomingProducts.map((ele)=>{
                    return <div key={ele._id} className="col-md-4">
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
                    {
                        auth?.role == 'buyer' &&
                        <button className="btn btn-primary" onClick={()=>handleClick(ele._id)}>Add Cart</button>
                    }
                    </div>
                })
            }
        </div>
    )
}