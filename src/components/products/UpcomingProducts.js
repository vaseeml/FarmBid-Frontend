import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import Select from 'react-select'
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { startEditProduct , setDeleteProduct , removeProductFromUpcoming , addProductToLive, startGetUpComingProducts } from '../../actions/product-actions';
import CountDownTimer from './CountDownTimer';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Card, Button, OverlayTrigger, Tooltip, Row, Col,Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'
import {FilePond,registerPlugin} from 'react-filepond'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import SearchCity from './SearchCity';

// Register FilePond plugins
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageCrop
);
export default function UpcomingProducts() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useAuth()
    const upcomingProducts = useSelector((state) => state.products?.upcomingProducts);
    const serverError=useSelector((state)=>{
        return state.products.serverErrors
    })
    const city = useSelector((state)=>{
        return state.products.setCity
    })
    const [modal, setModal] = useState(false);
    const [editId, setEditId] = useState('')
    const [ selectCity , setSelectCity ] = useState([])
    const [errors,setErrors]=useState({})
    const [form, setForm] = useState({
        productName: '',
        stock: '',
        basePrice: '',
        address: '',
        cities:'',
        productImg: [],
        productVideo: '',
        biddingStart: ''
    });
    const [ page , setPage ] = useState(1) // initial page number 
    const [ isLoading , setIsLoading ] = useState(false)
    const limit = 8 // products per page
    const filteredProducts = upcomingProducts.filter((ele)=>{
        if(city){
            return ele.cities == city
        }else{
            return ele
        }
    })
    const toggle = () => {
        setModal(!modal);
    };
    
    const clientErrors={}
    const runValidation = () => {
        if (form.productName.trim().length === 0) {
            clientErrors.productName = 'Enter productName';
        }
        if (form.stock.trim().length === 0) {
            clientErrors.stock = 'Enter stock';
        }
        if (form.basePrice.trim().length === 0) {
            clientErrors.basePrice = 'Enter basePrice';
        }
        if (form.address.trim().length === 0) {
            clientErrors.address = 'Enter address';
        }
        if (form.cities.length === 0) {
            clientErrors.cities = 'Enter cities';
        }
        if (form.biddingStart.length === 0) {
            clientErrors.biddingStart = 'Enter biddingStart';
        }else {
            const selectedDateTime = new Date(form.biddingStart).getTime();
            const currentDateTime = new Date().getTime();
            if (selectedDateTime <= currentDateTime) {
                clientErrors.biddingStart = 'Bid start time should be greater than the current time.';
            }
        }
        setErrors(clientErrors);
        return clientErrors;
    };
    
    const helperFunction=(name)=>{
        return serverError?.filter((ele)=>{
            return ele.path===name
        }).map((ele,i)=>{
            return<li key={i}>{ele.msg}</li>
        })
    }
    
    const handleEdit = (id) => {
        const product = upcomingProducts.find((ele) => ele._id == id);
        console.log(product)
        setForm({
            productName: product?.productName || '',
            stock: product?.stock || '',
            weight: product?.weight || '',
            basePrice: product?.basePrice || '',
            address: product?.address || '',
            cities:product?.cities || '',
            productImg: product?.productImg && '',
            productVideo: product?.productVideo || '',
            biddingStart: product?.biddingStart || ''
        });
        setEditId(id)
    
        toggle();
    };
    const handleChange = (option) => {
        console.log('option' ,option)
        setForm({...form,cities:option.value})
        };
    const handleDelete = async (id) => {
        const confirm = window.confirm(`Are You Sure ${user?.username}?`)
        if (confirm) {

            dispatch(setDeleteProduct(id))
        }
    };
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'file' ? e.target.files[0] : value;
        setForm({ ...form, [name]: newValue });
    };

    const handleFileUpdate = (fileItems) => {
        setForm((prevState) => ({
          ...prevState,
          productImg: fileItems.map((fileItem) => fileItem.file),
        }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
         const validationErrors = runValidation();
        if(Object.keys(validationErrors).length==0){
        const formData = new FormData();
        formData.append('productName', form.productName);
        formData.append('stock', form.stock);
        formData.append('weight', form.weight);
        formData.append('basePrice', form.basePrice);
        formData.append('address', form.address);
        formData.append('cities', form.cities);
        if(form.productImg){
            form.productImg.forEach((image) => formData.append('productImg', image)); // Append each image
        }
        formData.append('productVideo', form.productVideo);
        formData.append('biddingStart', form.biddingStart)
        dispatch(startEditProduct(editId, formData))
        toggle()
    }else{
        console.log('hi')
        setErrors(validationErrors)
    }
    }
    const handleClick = async(id)=>{
        // checking the role before making api requests
        if(user?.role === 'buyer'){
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
                // console.log('added to cart' , response.data)
                navigate('/cart')
            }catch(err){
                console.log(err)
                swal(err.response.data.error , 'already there!' , 'warning')
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

    const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    
      const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get('http://localhost:3000/api/getcity')
                setSelectCity(response.data.map(city => ({value:city , label:city})))
            } catch(err){
                console.log(err)
            }
        })();
    },[])
    useEffect(()=>{
        window.addEventListener('scroll' , handleScroll)
        return ()=>{
            window.removeEventListener('scroll' , handleScroll)
        }
    } , [])
    useEffect(()=>{
        // setIsLoading(true)
        console.log('useEffect is called for page request')
        dispatch(startGetUpComingProducts({role:user?.role , page:page , limit:limit}))
    }, [page])
    const handleScroll = ()=>{
        const { scrollTop , scrollHeight , clientHeight } = document.documentElement
        if(scrollTop + clientHeight >= scrollHeight - 5){
            setPage(prev=>prev+1) // incrementing the page number
        }
    }
    console.log('upcoming products ' , upcomingProducts)
    return (
        
        <div>
           <SearchCity />
            <Container>
                <Row xs={1} md={4}>
                {filteredProducts.map((ele) => (
                    <Col key={ele._id} >
                       <Card className="bg-light mt-4 ml-4">
                        <Carousel interval={3000} controls={false} indicators={false}>
                        
                            {ele.productImg.map((ele)=>{
                            return <Carousel.Item>
                                <img
                                src={`http://localhost:3000/${ele}`}
                                alt="Product Image"
                                height="250px"
                                width="260px"
                                className="d-block w-100"
                                />
                                </Carousel.Item>
                            })}
                            
                        
                        <Carousel.Item>
                            <video autoPlay muted loop className="d-block w-100" style={{ height: '250px' }}>
                            <source src={`http://localhost:3000/${ele.productVideo}`} type="video/mp4" />
                            </video>
                        </Carousel.Item>
                        </Carousel>
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
                                    <div className="mb-2">Base Price: {ele.basePrice}Rs</div>
                                    <div className="mb-1">Quantity: {ele.stock}basket || Weight: {ele.weight?ele.weight:'Not Mentioned'}kgs (per 1 basket)</div>
                                    <div className="d-flex align-items-center position-absolute top-0 end-0">
                                        <CountDownTimer biddingStart={new Date(ele.biddingStart)} onBiddingStart={()=>onBiddingStart(ele._id)}/>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-2">
                                    {user?.role == 'buyer' && <Button variant="success" size="sm" className="me-2" onClick={()=>handleClick(ele._id)}>Add To WishList</Button> }
                                    {/* {user?.role == 'buyer' && <BsBookmarkFill style={{ color: 'black', fontSize: '1.5rem' }} onClick={()=>handleClick(ele._id)}/>} */}
                                    {user?.role == 'seller' && <Button variant="warning" size="sm" className="me-2" onClick={() => {handleEdit(ele._id)}} >Edit</Button> }
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
                <ModalBody >
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
                        {form.productName?.length==0&&<p style={{color:'red'}}>{errors.productName}</p>}
                    {serverError?.length>0 && <p style={{color:'red'}}>{helperFunction('productName')}</p>}
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
                        {form.stock?.length==0&&<p style={{color:'red'}}>{errors.stock}</p>}
                    {serverError?.length>0 && <p style={{color:'red'}}>{helperFunction('stock')}</p>}
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
                         {form.basePrice?.length==0&&<p style={{color:'red'}}>{errors.basePrice}</p>}
                    {serverError?.length>0 && <p style={{color:'red'}}>{helperFunction('basePrice')}</p>}

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
                         {form.address?.length==0&&<p style={{color:'red'}}>{errors.address}</p>}
                    {serverError?.length>0 && <p style={{color:'red'}}>{helperFunction('address')}</p>}
                    </div>
                    <div className="form-group">
                    <label>City</label>
                    <Select
                    options={selectCity}
                    value={selectCity.find(city => city.value === form.cities)}
                    onChange={handleChange}
                    placeholder="Search for a district..."
                    isSearchable
                    />
                    {form.cities?.length==0&&<p style={{color:'red'}}>{errors.cities}</p>}
                    {serverError?.length>0 && <p style={{color:'red'}}>{helperFunction('cities')}</p>}

                    </div>
                    <div className="form-group">
                        <label htmlFor="productImg">Image</label>
                        <FilePond
                        allowMultiple={true}
                        name="productImg"
                        files={form.productImg}
                        onupdatefiles={handleFileUpdate}
                        /><br/>
                        {/* {form.productImg?.length==0&&<p style={{color:'red'}}>{errors.productImg}</p>} */}

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
                         {/* {form.productVideo?.length==0&&<p style={{color:'red'}}>{errors.productVideo}</p>} */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="biddingStart">BidStartDate</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="biddingStart"
                            name="biddingStart"
                            min={minDateTime} 
                            value={form.biddingStart}
                            onChange={handleInputChange}
                        />
                        {errors.biddingStart && <p style={{ color: 'red' }}>{errors.biddingStart}</p>}

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
