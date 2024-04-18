import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { startEditProduct } from '../../actions/product-actions';
import { setDeleteProduct } from '../../actions/product-actions';
export default function UpcomingProducts() {
    const dispatch = useDispatch()
    const upcomingProducts = useSelector((state) => state.products?.upcomingProducts);
    const auth = useSelector((state) => state.auth?.data);
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
            {upcomingProducts.map((ele) => (
                <div key={ele._id} className="col-md-4">
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

                    {auth.role == 'buyer' && <button className="btn btn-primary" onClick={()=>handleClick(ele._id)}>AddCart</button>}
                    {auth.role == 'seller' && <button className="btn btn-primary" onClick={() => { handleEdit(ele._id) }}>Edit</button>}
                    {auth.role == 'seller' && <button className="btn btn-primary" onClick={() => { handleDelete(ele._id) }}>Delete</button>}
                </div>
            ))}
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
