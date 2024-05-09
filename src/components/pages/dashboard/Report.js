import { useState } from "react";
import {FilePond,registerPlugin} from 'react-filepond'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginImageCrop
  );
export default function Report(){
    const [ form , setForm ] = useState({
        orderId:'',
        productImage:[],
        description:''
    })
    const [formErrors , setFormErrors] = useState({})
    const navigate = useNavigate()
    const handleFileUpdate = (fileItems)=>{
        console.log('filepath' ,fileItems[0].file)
        setForm((prevState) =>({
            ...prevState , productImage:fileItems.map(item=>item.file)
        }))
    }
    const handleChange = (e)=>{
        const { name , value } = e.target
        setForm({...form , [name]: value})
    }
    const errors = {}
    const validateErrors = ()=>{
        if(form.orderId.trim().length === 0){
            errors.orderId = 'Order Id is required!'
        }
        if(form.description.trim().length == 0){
            errors.description = 'description is required!'
        }
        if(form.productImage.length == 0){
            errors.productImage = 'images are required for proof!'
        }
        setFormErrors(errors)
        return errors
    }
    const handleSubmit =async(e)=>{
        e.preventDefault()
        
        // console.log('form' , form)
        validateErrors()
       if(Object.entries(errors).length ==0){
        const formData = new FormData();
        formData.append('orderId', form.orderId);
        formData.append('description', form.description);
        form.productImage.forEach((image) => formData.append('productImage', image)); // Append each image
        // console.log('form/data' , formData)
        try{
            const response = await axios.post('http://localhost:3000/api/reports', formData, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                }
            })
            swal('Report sent to admin!' , 'wait for admin response' , 'success')
            navigate('/live')
            // console.log('res' , response.data)
            setFormErrors(null)
        } catch(err){
            console.log(err)
            alert(err.response.data.error)
            navigate('/live')
        }
       }else{
        setFormErrors(errors)
       }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{width:'500px',height:'500px' ,overflow:'auto'}}>
            <h2 className="mb-4 d-flex align-items-center justify-content-between">Report</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="order">Order Id</label><br/>
                <input
                    type='text'
                    className="form-control"
                    value={form.orderId}
                    onChange={handleChange}
                    name="orderId"
                    id="order"
                    placeholder="Paste OrderId Of Product"
                    />
                    {formErrors.orderId && <p style={{color:'red'}}>{formErrors.orderId}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label><br/>
                <textarea 
                name="description" 
                className="form-control"
                value={form.description} 
                onChange={handleChange} 
                placeholder="write the issue in detail!">
                </textarea>
                    {formErrors.description && <p style={{color:'red'}}>{formErrors.description}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="productImage">Select Multiple Images</label><br/>
                <FilePond
                    allowMultiple={true}
                    className="form-control"
                    name="productImage"
                    files={form.productImage}
                    onupdatefiles={handleFileUpdate}
                    allowFileTypes={['image']}
                    acceptedFileTypes={['image/*']}
                    />
                    {formErrors.productImage && <p style={{color:'red'}}>{formErrors.productImage}</p>}
            </div>
            <input type="submit"  className="btn btn-primary"/>
            </form>
            </div>
        </div>
    )
}
