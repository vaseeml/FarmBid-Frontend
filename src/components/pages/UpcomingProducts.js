import { useSelector } from 'react-redux'
export default function UpcomingProducts(){
    const upcomingProducts = useSelector((state)=>{
        return state.products?.upcomingProducts
    })
    const auth = useSelector((state)=>{
        return state.auth?.data
    })
    
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
                    <button className="btn btn-primary">{auth.role == 'buyer'?'bid':'see details'}</button>
                    </div>
                })
            }
        </div>
    )
}