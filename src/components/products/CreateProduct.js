import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { startCreateProducts } from '../../actions/product-actions';
import {FilePond,registerPlugin} from 'react-filepond'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import Select from 'react-select'
import axios from 'axios';
// Register FilePond plugins
registerPlugin(
  FilePondPluginFileEncode,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageCrop
);
export default function CreateProduct() {
    const [ selectCity , setSelectCity ] = useState([])
    const serverError=useSelector((state)=>{
        return state.products.serverErrors
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [errors,setErrors]=useState({})
    const [form, setForm] = useState({
        productName: '',
        stock: '',
        weight: '',
        basePrice: '',
        address: '',
        cities:'',
        productImg: [],
        productVideo: '',
        biddingStart: '',
        biddingEnd: ''
    });
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
        if (form.productImg.length === 0) {
            clientErrors.productImg = 'Enter productImg';
        }
        if (form.productVideo.length === 0) {
            clientErrors.productVideo = 'Enter productVideo';
        }
        if (form.biddingStart.length === 0) {
            clientErrors.biddingStart = 'Enter biddingStart';
        }
        if (form.biddingEnd.length === 0) {
            clientErrors.biddingEnd = 'Enter biddingEnd';
        }
        else{
            const biddingStartDate = new Date(form.biddingStart).getTime();
            const biddingEndDate = new Date(form.biddingEnd).getTime();
            const currentDateTime = new Date().getTime();
            if (biddingStartDate <= currentDateTime) {
                clientErrors.biddingStart = 'Bid Start Time Should Be Greater Than Current Time.';
            }
            if(biddingEndDate <= biddingStartDate){
                clientErrors.biddingEnd = 'Bid End Time Should Be Greater Than Bidding Start Time'
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
     const handleChange = (option) => {
        setForm({...form,cities:option})
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
      const handleSubmit = (e) => {
        e.preventDefault()
        if(Object.keys(runValidation()).length==0){
        const formData = new FormData();
        formData.append('productName', form.productName);
        formData.append('stock', form.stock);
        formData.append('weight', form.weight)
        formData.append('basePrice', form.basePrice);
        formData.append('address', form.address);
        formData.append('cities', form.cities?.value);
        form.productImg.forEach((image) => formData.append('productImg', image)); // Append each image
        formData.append('productVideo', form.productVideo);
        formData.append('biddingStart', form.biddingStart)
        formData.append('biddingEnd', form.biddingEnd)
        dispatch(startCreateProducts(formData,navigate))
        setErrors('')
        }
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  
    const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    // const minDateTime = new Date().toISOString().slice(0, 16); // Get current date-time in 'YYYY-MM-DDTHH:mm' format
    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get('http://localhost:4000/api/getcity')
                setSelectCity(response.data.map(city => ({value:city , label:city})))
            } catch(err){
                console.log(err)
            }
        })();
    },[])
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4" style={{width:'600px',height:'600px',overflow: 'auto' }}>
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
                    {form.productName?.length==0&&<p style={{color:'red'}}>{errors.productName}</p>}
                    {serverError?.length>0 && <p style={{color:'red'}}>{helperFunction('productName')}</p>}
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
                    {form.stock?.length==0&&<p style={{color:'red'}}>{errors.stock}</p>}
                    {serverError?.length>0 && <p style={{color:'red'}}>{helperFunction('stock')}</p>}
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
                    <label htmlFor="basePrice">Base Price(Total weight/stock)</label>
                    <input
                        type="text" placeholder='ex:100'
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
                    <label>City</label>
                    <Select
                    options={selectCity}
                    onChange={handleChange}
                    placeholder="Search for a district..."
                    isSearchable
                    />
                    {form.cities?.length==0&&<p style={{color:'red'}}>{errors.cities}</p>}
                    {serverError?.length>0 && <p style={{color:'red'}}>{helperFunction('cities')}</p>}

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
                    {form.address?.length==0&&<p style={{color:'red'}}>{errors.address}</p>}
                    {serverError?.length>0 && <p style={{color:'red'}}>{helperFunction('address')}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="productImg">Image</label>
                    <FilePond
                    allowMultiple={true}
                    name="productImg"
                    files={form.productImg}
                    onupdatefiles={handleFileUpdate}
                    /><br/>
                    {form.productImg?.length==0&&<p style={{color:'red'}}>{errors.productImg}</p>}

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
                    {form.productVideo?.length==0&&<p style={{color:'red'}}>{errors.productVideo}</p>}

                </div>
                <div className="form-group">
                    <label htmlFor="biddingStart">BidStartDate</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="biddingStart"
                        name="biddingStart"
                        value={form.biddingStart}
                        min={minDateTime} 
                        onChange={handleInputChange}
                    />
                    {errors.biddingStart&&<p style={{color:'red'}}>{errors.biddingStart}</p>}

                </div>
                <div className="form-group">
                    <label htmlFor="biddingEnd">BidEndDate</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="biddingEnd"
                        name="biddingEnd"
                        value={form.biddingEnd}
                        min={minDateTime} 
                        onChange={handleInputChange}
                    />
                    {errors.biddingEnd&&<p style={{color:'red'}}>{errors.biddingEnd}</p>}

                </div>
                <input type="submit" className="btn btn-primary" />
            </form>
            </div>
        </div>
    )
}