import { useState } from 'react';
import axios from 'axios'
export default function Login() {
    const [credentials, setCredentials] = useState({
        loginId: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }
    const handleForm = async(e)=>{
        e.preventDefault()
        // const formData = {
        //     email:credentials.email,
        //     password:credentials.password
        // }
        try{
            const response = await axios.post('http://localhost:3000/api/login' , credentials)
            console.log(response.data)
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                            <h2 className=' text-center'>Login</h2>
                            <form onSubmit={handleForm}>
                                <div className='form-group'>
                                    <label className='form-label' htmlFor='loginId'>Enter Email/Phone</label>
                                    <input 
                                        type='text'
                                        value={credentials.loginId}
                                        onChange={handleChange}
                                        name='loginId'
                                        id='loginId'
                                        placeholder='Enter Email/Phone...'
                                        className='form-control'
                                    />
                                </div>
                                <div className='form-group'>
                                    <label className='form-label' htmlFor='password'>Enter Password</label>
                                    <input 
                                        type='password'
                                        value={credentials.password}
                                        onChange={handleChange}
                                        name='password'
                                        id='password'
                                        placeholder='Enter Password...'
                                        className='form-control'
                                    />
                                </div>
                                <div>
                                <button className='btn btn-primary' >Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
    )
}
