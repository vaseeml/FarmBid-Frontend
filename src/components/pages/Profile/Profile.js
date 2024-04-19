
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { setProfile } from '../../../actions/user-actions';
import { useState } from 'react';

export default function CreateProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: '',
        image: '',
        description: ''
    })
    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === 'file' ? e.target.files[0] : value;
        setForm({ ...form, [name]: newValue });

    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('phone', form.phone);
        formData.append('address', form.address);
        formData.append('image', form.image)
        formData.append('description', form.description);
        try {
            const response = await axios.post('http://localhost:3000/api/profile', formData, {
                headers: { 'Authorization': localStorage.getItem('token') },
                'Content-Type': 'multipart/form-data'
            })
            console.log(response.data)
            dispatch(setProfile(response.data))
            navigate('/login-sucess')
        } catch (err) {
            console.log(err)
        }

    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4">
                <h2 className="mb-4 d-flex align-items-center justify-content-between">
                    Add Profile <FontAwesomeIcon icon={faUser} className="ml-2 text-primary" style={{ alignSelf: 'auto' }} />
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text" placeholder='ex:virat'
                            className="form-control"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text" placeholder='ex:9876543210'
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='address'>Address</label>
                        <input
                            type="text" placeholder='ex-bengaluru'
                            className='form-control'
                            id='address'
                            name='address'
                            value={form.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input
                            type="file" placeholder='ex:jpeg/jpg/png'
                            className="form-control"
                            id="image"
                            name="image"

                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text" placeholder='ex:seed to feed'
                            className="form-control"
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleInputChange}
                        />
                    </div>

                    <input type="submit" className="btn btn-primary" />
                </form>
            </div>
        </div>
    );
}
