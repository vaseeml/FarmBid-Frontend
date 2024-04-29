
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { setProfile } from '../../../actions/user-actions';
import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { profileCreatedNotify } from '../../Notify';
export default function CreateProfile() {
    const profile = useSelector((state) => {
        return state.user.profile
    })
    console.log(profile)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [disabled, setDisabled] = useState(true)
    const [showFileInput, setShowFileInput] = useState(false);
    const fileInputRef = useRef(null);
    const [chosenFile, setChosenFile] = useState(null);
    const [errors,setErrors] = useState({})
    const [serverErrors,setServerErrors]=useState([])
    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: '',
        image: '',
        description: ''
    })
    
    const clientErrors={}
    const runValidation=()=>{
        if(form.name.trim().length==0){
            clientErrors.name='Name is required'
        }
        if(form.address.trim().length==0){
            clientErrors.address='Address is required'
        }
        if(form.image.length==0){
            clientErrors.image='image is required'
        }
        if(form.description.trim().length==0){
            clientErrors.description='Description is required'
        }
        setErrors(clientErrors)
        return clientErrors
    }

    const helperFunction=(value)=>{
        serverErrors.filter((ele)=>{
            return ele.path===value
        }).map((ele,i)=>{
            return <li key={i}>{ele.msg}</li>
        })
    }

    useEffect(() => {
        if (profile) {
            setForm({
                name: profile.name || '',
                phone: profile.phone || '',
                address: profile.address || '',
                image: profile.image || '',
                description: profile.description || '',
            });
        }
    }, [profile]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'file' ? e.target.files[0] : value;
        setChosenFile(e.target.files && e.target.files[0]);
        setForm({ ...form, [name]: newValue });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors=runValidation()
        if(Object.keys(validationErrors).length==0){
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('phone', form.phone);
        formData.append('address', form.address);
        formData.append('image', form.image);
        formData.append('description', form.description);
        try {
            const response = await axios.post(`http://localhost:3000/api/profile`, formData, {
                headers: { 'Authorization': localStorage.getItem('token') },
                'Content-Type': 'multipart/form-data'
            })
            console.log(response.data)
            dispatch(setProfile(response.data))
            profileCreatedNotify()
            navigate('/login-sucess')
        } catch (err) {
            console.log(err)
            setServerErrors(err.response.data.errors)
        }
    }else{
        setErrors(validationErrors)
    }

    };
    const handleEditImage = () => {
        setShowFileInput(true); // Set showFileInput to true to display the file input
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Programmatically trigger click event on file input
        }
    };

    const handleEdit = () => {
        setDisabled(false)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setDisabled(true)
        const validationErrors=runValidation()
        if(Object.keys(validationErrors).length==0){
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('address', form.address);
        formData.append('description', form.description);
        if (chosenFile) {
            formData.append('image', chosenFile);
        } else {
            formData.append('image', form.image); // Keep the existing image if no new one is chosen
        }
        try {
            const response = await axios.put(`http://localhost:3000/api/profile/${profile._id}`, formData, {
                headers: { 'Authorization': localStorage.getItem('token') },
                'Content-Type': 'multipart/form-data'
            })
            console.log(response.data)
            profileCreatedNotify()
            // dispatch(setProfile(response.data))
            // navigate('/login-sucess')
        } catch (err) {
            console.log(err)
            setServerErrors(err.response.data.errors)
        }}else{
            setErrors(validationErrors)
        }

    }

    return (
        <Container>
            <Row>
                {profile && (
                    <Col md={6}>
                        <div className='position-relative'>
                            <Image src={chosenFile ? URL.createObjectURL(chosenFile) : `http://localhost:3000/${profile.image}`} alt='img' height='500px' width='500px' roundedCircle />
                            <Button variant='link'
                                className='position-absolute bottom-0 end-1'
                                onClick={handleEditImage}>Edit Image
                                <FontAwesomeIcon icon={faEdit} size='lg' />
                            </Button>
                            {showFileInput && (
                                <input
                                    type='file'
                                    name='image'
                                    ref={fileInputRef}
                                    onChange={handleInputChange}
                                    style={{ display: 'none' }}
                                />
                            )}
                        </div>
                    </Col>
                )}
                <Col md={profile ? 6 : 12}>
                    {profile ? (
                        <div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name='name'
                                    value={form.name}
                                    onChange={handleInputChange}
                                    disabled={disabled}
                                />
                                {form.name.length==0 && <p style={{color:'red'}}>{errors.name}</p>}
                                {serverErrors.length>0 && <p style={{color:'red'}}>{helperFunction('name')}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name='phone'
                                    value={form.phone}
                                    disabled={true}
                                />
                                
                            </div>
                            <div className='form-group'>
                                <label htmlFor='address'>Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name='address'
                                    value={form.address}
                                    onChange={handleInputChange}
                                    disabled={disabled}
                                />
                                {form.address.length==0 && <p style={{color:'red'}}>{errors.address}</p>}
                                {serverErrors.length>0 && <p style={{color:'red'}}>{helperFunction('address')}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name='description'
                                    value={form.description}
                                    onChange={handleInputChange}
                                    disabled={disabled}
                                />
                                {form.description.length==0 && <p style={{color:'red'}}>{errors.description}</p>}
                                {serverErrors.length>0 && <p style={{color:'red'}}>{helperFunction('description')}</p>}
                            </div>
                            <Button onClick={handleEdit} disabled={!disabled}>Edit</Button>
                            <Button onClick={handleSave}>Save</Button>

                        </div>
                    ) : (
                        <div className="d-flex justify-content-center align-items-center vh-100">
                            <div className="card p-4">
                                <h2 className="mb-4 d-flex align-items-center justify-content-between">
                                    Add Profile <FontAwesomeIcon icon={faUser} className="ml-2 text-primary" />
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            placeholder='ex:virat'
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleInputChange}
                                        />
                                        {form.name.length==0 && <p style={{color:'red'}}>{errors.name}</p>}
                                        {serverErrors.length>0 && <p style={{color:'red'}}>{helperFunction('name')}</p>}
                                    </div>
                                   <div className='form-group'>
                                        <label htmlFor='address'>Address</label>
                                        <input
                                            type="text"
                                            placeholder='ex-bengaluru'
                                            className='form-control'
                                            id='address'
                                            name='address'
                                            value={form.address}
                                            onChange={handleInputChange}
                                        />
                                        {form.address.length==0 && <p style={{color:'red'}}>{errors.address}</p>}
                                        {serverErrors.length>0 && <p style={{color:'red'}}>{helperFunction('address')}</p>}
                                        
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Image</label>
                                        <input
                                            type="file"
                                            placeholder='ex:jpeg/jpg/png'
                                            className="form-control"
                                            id="image"
                                            name="image"
                                            onChange={handleInputChange}
                                        />
                                        {form.image.length==0 && <p style={{color:'red'}}>{errors.image}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <input
                                            type="text"
                                            placeholder='ex:seed to feed'
                                            className="form-control"
                                            id="description"
                                            name="description"
                                            value={form.description}
                                            onChange={handleInputChange}
                                        />
                                        {form.description.length==0 && <p style={{color:'red'}}>{errors.description}</p>}
                                        {serverErrors.length>0 && <p style={{color:'red'}}>{helperFunction('description')}</p>}

                                    </div>

                                    <input type="submit" className="btn btn-primary" />
                                </form>
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
