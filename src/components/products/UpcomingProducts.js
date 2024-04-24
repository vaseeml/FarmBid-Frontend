import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { useReducer, useState } from 'react';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { startEditProduct , setDeleteProduct , removeProductFromUpcoming , addProductToLive } from '../../actions/product-actions';
import CountDownTimer from './CountDownTimer';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Card, Button, OverlayTrigger, Tooltip, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export default function UpcomingProducts() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useAuth()
    const upcomingProducts = useSelector((state) => state.products?.upcomingProducts);
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState('')
    const [form, setForm] = useState({
        productName: '',
        stock: '',
        basePrice: '',
        address: '',
        productImg: '',
        productVideo: '',
        biddingStart: ''
    });

    const toggle = () => {
        setModal(!modal);
    };

    const handleEdit = (id) => {
        const product = upcomingProducts.find((ele) => ele._id == id);
        setForm({
            productName: product.productName || '',
            stock: product.stock || '',
            weight: product.weight || '',
            basePrice: product.basePrice || '',
            address: product.address || '',
            productImg: product.productImg || '',
            productVideo: product.productVideo || '',
            biddingStart: product.biddingStart || ''
        });
        setEditId(id)
        console.log(form)
        toggle();
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm('Are You Sure Boss!')
        if (confirm) {

            dispatch(setDeleteProduct(id))
        }
    };
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'file' ? e.target.files[0] : value;
        setForm({ ...form, [name]: newValue });

    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('productName', form.productName);
        formData.append('stock', form.stock);
        formData.append('weight', form.weight);
        formData.append('basePrice', form.basePrice);
        formData.append('address', form.address);
        formData.append('productImg', form.productImg);
        formData.append('productVideo', form.productVideo);
        formData.append('biddingStart', form.biddingStart)
        dispatch(startEditProduct(editId, formData))
        toggle()
    }
    const handleClick = async(id)=>{
        // checking the role before making api requests
        if(user?.role == 'buyer'){
            try{
                const formData = {
                    product:id,
                    user:user._id
                }
                // if buyer add item to cart
                const response = await axios.post('http://localhost:3000/api/cart' ,formData, {
                    headers:{
                        'Authorization':localStorage.getItem('token')
                    }
                })
                console.log('added to cart' , response.data)
                navigate('/cart')
            }catch(err){
                console.log(err)
            }
        }
        else{
            // for a reason
            alert('No Route Found')
        }

    }
    const onBiddingStart = (productId)=>{
        // first adding the product to live section 
        dispatch(addProductToLive(productId)).then(()=>{
            // after successfully adding the product then remove product from upcoming section
            dispatch(removeProductFromUpcoming(productId))
        })
        console.log(`product id:${productId} has moved from upcoming section to live section`)
    }
    return (
        <div>
            <Container>
                <Row xs={1} md={3}>
                {upcomingProducts.map((ele) => (
                    <Col key={ele._id} >
                        <Card className='bg-light mb-3' style={{ height: '400px' }}>
                            <Card.Img
                                src={`http://localhost:3000/${ele.productImg}`} alt='img'
                                height='200px' width='260px'
                            />

                            <Card.Body className="position-relative d-flex flex-column justify-content-between">
                                    <div className='d-flex justify-content-start mb-2'>
                                        <Card.Title>
                                            Veg. Name: {ele.productName.toUpperCase()}
                                        </Card.Title>
                                    </div>
                                    <div>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                        <Tooltip id={`tooltip-seller-${ele._id}`}>
                                            Seller Details: {ele.sellerId?.email}
                                        </Tooltip>
                                        }
                                    >
                                        <span> Farmer Ph:{ele.sellerId?.phone|| 'seller:'}</span>
                                    </OverlayTrigger>
                                    </div>
                                    <div className="mb-2">Quantity: {ele.quantity}</div>
                                    <div className="d-flex align-items-center position-absolute top-0 end-0">
                                        <CountDownTimer biddingStart={new Date(ele.biddingStart)} onBiddingStart={()=>onBiddingStart(ele._id)}/>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                    {user?.role == 'buyer' && <Button variant="success" size="sm" className="me-2" onClick={()=>handleClick(ele._id)}>Add to Cart</Button> }
                                    {user?.role == 'seller' && <Button variant="warning" size="sm" className="me-2" onClick={() => { handleEdit(ele._id) }} >Edit</Button> }
                                    {user?.role == 'seller' && <Button variant="danger" size="sm" onClick={() => { handleDelete(ele._id) }}>Delete</Button> }
                                    </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                </Row>
            </Container>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label htmlFor="productName">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            name="productName"
                            value={form.productName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock">Stock</label>
                        <input
                            type="text"
                            className="form-control"
                            id="stock"
                            name="stock"
                            value={form.stock}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight">Weight</label>
                        <input
                            type="text"
                            className="form-control"
                            id="weight"
                            name="weight"
                            value={form.weight}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="basePrice">Base Price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="basePrice"
                            name="basePrice"
                            value={form.basePrice}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={form.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productImg">Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="productImg"
                            name="productImg"

                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="productVideo">Video</label>
                        <input
                            type="file"
                            className="form-control"
                            id="productVideo"
                            name="productVideo"

                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="biddingStart">BidStartDate</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="biddingStart"
                            name="biddingStart"
                            value={form.biddingStart}
                            onChange={handleInputChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                        Update
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
