import { useSelector } from "react-redux"

export default function Home(){
    const products = useSelector((state)=>{
        // state is object which has products objects
        return state.products
    })
    return(
        <div>
            <h2>FarmBid Connect</h2>
            <div>
                {
                    products.data.map((ele)=>{
                        return <div key={ele._id}>
                            <div>{ele.productName}</div>
                            <div>
                                <img
                                    src={`http://localhost:3000/files/images/${ele.productImg}`} alt='img'
                                    height='300px' width='260px'
                                />
                            </div>
                            <div>
                                <video controls>
                                    src={`http://localhost:3000/files/videos/${ele.productVideo}`}
                                    enable to play
                                </video> 
                            </div>
                            <div>{ele.sellerId?.name}</div></div>
                    })
                }
            </div>
        </div>
    )
}