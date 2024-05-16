import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { loginNotify } from '../../Notify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { gapi } from 'gapi-script';
import loginbg from '../../../assets/login-bg.avif';
const LoginForm = ({ setUserLogin }) => {
  const [serverErrors, setServerErrors] = useState([])
  const [clientId, setClientId] = useState('')
  const navigate = useNavigate()
  const { userDispatch } = useAuth()
  const initialValues = {
    loginId: '',
    password: '',
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    loginId: Yup.string().required('Email/Phone is required'),
    password: Yup.string().required('Password is required'),
  })
  const helperFunction = (name) => {
    return serverErrors?.filter((ele) => {
      return ele.path === name
    }).map((ele, i) => {
      return <div key={i} style={{ padding: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '30px'}}>{ele.msg}</div>
    })
  }
  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:4000/api/login', values)
      localStorage.setItem('token', response.data.token)
      setServerErrors("")
      userDispatch({ type: 'SET_USER', payload: response.data.user })
      setUserLogin()
      if (response.data.user?.role !== 'admin') {
        navigate('/live')
      } else {
        navigate('/dashboard')
      }
      loginNotify()
    } catch (err) {
      console.log(err)
      setServerErrors(err.response.data.errors)
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/google-clientId')
        setClientId(response.data.clientId)
      } catch (err) {
        alert(err)
        console.log(err)
      }
    })();
  }, [])
  const handleGoogleSignIn = () => {
    if (window.gapi) {
      console.log(gapi)
      window.gapi.load('auth2')
      initGoogleSignIn()
    } else {
      window.onload = initGoogleSignIn
    }
  }
  const initGoogleSignIn = async () => {
    try {
      await window.gapi.auth2?.init({
        client_id: '242537127655-sgivplruev8nfu7gru7m01qslimqdj61.apps.googleusercontent.com',
        scope: "email",
        plugin_name: 'FarmBid-Connect'
      })
      const auth2 = window.gapi.auth2?.getAuthInstance();
      const googleUser = await auth2?.signIn()
      const token = googleUser?.getAuthResponse().id_token
      if (token) {
        const response = await axios.post('http://localhost:4000/api/google/login', { token })
        localStorage.setItem('token', response.data.token)
        setServerErrors("")
        userDispatch({ type: 'SET_USER', payload: response.data.user })
        setUserLogin()
        if (response.data.user?.role !== 'admin') {
          navigate('/live')
        } else {
          navigate('/dashboard')
        }
        loginNotify()
      }

    } catch (err) {
      console.log(err)
      alert(err.error)
    }
  }

  return (
    //   <div  style={{
    //     backgroundImage: `url(${loginbg})`,
    //     backgroundSize: 'cover',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'center',
    //     minHeight: '100vh', // Ensure the div covers the entire viewport height
    // }}>
    <div className="d-flex justify-content-center align-items-center vh-100" >
      <div className="card p-4" >
        <h2 className="mb-4 d-flex align-items-center justify-content-between">Login
          <FontAwesomeIcon icon={faUser} className="ml-2" style={{ color: 'black' }} />
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {serverErrors?.length > 0 && <p style={{ color: 'black' , backgroundColor:'#e68c99'}}>{helperFunction('loginId')}</p>}
            {serverErrors?.length > 0 && <p style={{ color: 'black' , backgroundColor:'#e68c99' }}>{helperFunction('password')}</p>}
            {serverErrors?.length > 0 && <p style={{ color: 'black' , backgroundColor:'#e68c99' }}>{helperFunction('blocked')}</p>}

            <FormGroup controlId="loginId">
              <FormLabel>Email/Phone</FormLabel>
              <Field
                size='lg'
                type="text"
                name="loginId"
                placeholder="Enter Email/phone"
                as={FormControl}
              />
              <ErrorMessage name="loginId" component="div" className="text-danger" />
              {/* {serverErrors?.length>0&&<p style={{color:'red'}}>{helperFunction('loginId')}</p>} */}
            </FormGroup>

            <FormGroup controlId="password">
              <FormLabel>Password</FormLabel>
              <Field
                size='lg'
                type="password"
                name="password"
                placeholder="Enter password"
                as={FormControl}
              />
              <ErrorMessage name="password" component="div" className="text-danger" />

            </FormGroup>

            <Button type="submit" >Login</Button><br />
            <Link to='/forgot-password'>Forgot Password?</Link> <br /> <Link to='/register'>New User! Register Here </Link>
          </Form>
        </Formik>
        or
        <Button onClick={handleGoogleSignIn}>SignIn With Google</Button>
      </div>
    </div>
    // </div> 
  );
};

export default LoginForm;
