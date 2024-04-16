import { useSelector } from 'react-redux'
export default function CompletedProducts(){
    const completedProducts = useSelector((state)=>{
        return state.products?.completedProducts
    })
    const auth = useSelector((state)=>{
        return state.auth?.data
    })
    
    return (
        <div>
            {
                completedProducts.map((ele)=>{
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
                
                    </div>
                })
            }
        </div>
    )
}