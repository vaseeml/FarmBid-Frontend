import axios from "axios"
import { useState , useEffect } from "react"
import { Container, Row, Col } from 'reactstrap'
import CartItem from './CartItem'
export default function Cart(){
    const [ cart , setCart ] = useState([])
    useEffect(()=>{
        (async()=>{
            try{
                // getting the cart items when page mounts
                const response = await axios.get('http://localhost:4000/api/cart' , {
                    headers:{
                        'Authorization':localStorage.getItem('token')
                    }
                })
                console.log('In Cart Items' , response.data)
                // setting cart items to state 
                setCart(response.data)
            }catch(err){
                console.log(err)
            }
        })();
    },[])
    const removeProduct = (id)=>{
        // remove the deleted product from the state
        const products = cart.filter((ele)=>{
            return ele._id !== id
        })
        // updating the state
        setCart(products)
        console.log('removed the product from the state')
    }
    return (
        <Container>
        <h2>Wish List</h2>
        <Row xs={1} md={3}>
            {cart.map((item, index) => (
            <CartItem key={index} item={item} removeProduct={removeProduct} />
            ))}
        </Row>
        </Container>
    )
}