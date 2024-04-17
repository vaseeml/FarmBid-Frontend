import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
export default function MyProduct(){
    // using useParams to get id from the url
    const { id } = useParams()
    // getting product data from redux store
    const product = useSelector((state)=>{
        return state.products.liveProducts.find(ele=>ele._id == id)
    })
    return (
            
                    <div key={product._id} className="col-md-4">
                    <div>
                    <img
                            src={`http://localhost:3000/${product.productImg}`} alt='img'
                            height='300px' width='260px'
                        />
                    
                    <div className="card-body"><h3 className="card-title">{product.productName}</h3>
                    {/* <video controls height='300px' width='260px'>
                            <source
                            key={product._id}
                            src={`http://localhost:3000/${product.productVideo}`}
                            />
                        </video> */}
                    <p className="card-text">{product.sellerId?.phone}</p></div>
                    </div>
                    <p>Base Price - {product.basePrice}</p>
                    <p>Farmer - {product.sellerId?.name}</p>
                    <p>Mobile Number - {product.sellerId?.phone}</p>
                    <p>Stock - {product.stock}</p>
                    <p>Address - {product.address}</p>
                    {/* <button className="btn btn-primary" onClick={handleClick}>{auth.role == 'buyer'?'bid':'see details'}</button> */}
                    </div>
    )
}