export default function Bid({product}){
    return (
        <div className='row justify-content-center'>
        <div key={product?._id} className="col-md-4">
        <div>
        <img
                src={`http://localhost:4000/${product?.productImg}`} alt='img'
                height='300px' width='260px'
        />
        <div className="card-body"><h3 className="card-title">{product?.productName}</h3>
        {/* <video controls height='300px' width='260px'>
                <source
                key={product._id}
                src={`http://localhost:4000/${product.productVideo}`}
                />
            </video> */}</div>
        </div>
        <p>Base Price - {product?.basePrice}Rs</p>
        <p>Farmer - {product?.sellerId?.username}</p>
        {/* <p>Mobile Number - {product?.sellerId?.phone}</p> */}
        <p>Stock - {product?.stock} Basket</p>
        <p>Address - {product?.address}</p>
        </div>
        </div>
    )
}