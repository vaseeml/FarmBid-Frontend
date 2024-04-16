import { useSelector } from "react-redux"

export default function LiveProducts(){
    const products=useSelector((state)=>{
        return state.products.liveProducts
    })
    return (
        <div>
            <h2>Live</h2>
            <ul>
                {products.map((ele) => (
                    <li key={ele._id}>
                        <h3>{ele.productName}</h3>
                    </li>
                ))}
            </ul>
        </div>
    )
}