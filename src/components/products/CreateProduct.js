import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { startCreateProducts } from '../../actions/product-actions';
export default function CreateProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        productName: '',
        stock: '',
        weight: '',
        basePrice: '',
        address: '',
        productImg: '',
        productVideo: '',
        biddingStart: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'file' ? e.target.files[0] : value;
        setForm({ ...form, [name]: newValue });

    };
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('productName', form.productName);
        formData.append('stock', form.stock);
        formData.append('weight', form.weight)
        formData.append('basePrice', form.basePrice);
        formData.append('address', form.address);
        formData.append('productImg', form.productImg);
        formData.append('productVideo', form.productVideo);
        formData.append('biddingStart', form.biddingStart)
        dispatch(startCreateProducts(formData))
        navigate('/live')
        
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4" style={{width:'600px'}}>
            <h2 className="mb-4 d-flex align-items-center justify-content-between">Create Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text" placeholder='ex:tomato'
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
                        type="text" placeholder='ex:10'
                        className="form-control"
                        id="stock"
                        name="stock"
                        value={form.stock}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='weight'>Weight</label>
                    <input
                        type="text" placeholder='optional...'
                        className='form-control'
                        id='weight'
                        name='weight'
                        value={form.weight}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="basePrice">Base Price</label>
                    <input
                        type="text" placeholder='ex:100'
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
                        type="text" placeholder='ex:bengaluru'
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
                        type="file" placeholder='ex:jpeg,jpg,png'
                        className="form-control"
                        id="productImg"
                        name="productImg"

                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productVideo">Video</label>
                    <input
                        type="file" placeholder='ex:mp4'
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
                <input type="submit" className="btn btn-primary" />
            </form>
            </div>
        </div>
    )
}