import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import { Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { loginNotify } from '../../Notify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({setUserLogin}) => {
  const [serverErrors,setServerErrors]=useState([])
  const navigate=useNavigate()
  const { userDispatch } = useAuth()
  const initialValues = {
    loginId: '',
    password: '',
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    loginId: Yup.string().required('Email/Phone is required'),
    password: Yup.string().required('Password is required'),
  });
    console.log(serverErrors)

    const helperFunction=(name)=>{
      return serverErrors?.filter((ele)=>{
        return ele.path===name
    }).map((ele,i)=>{
        return<li key={i}>{ele.msg}</li>
    })
    }
  // Handle form submission
  const handleSubmit = async(values) => {
    try{
      const response=await axios.post('http://localhost:3000/api/login',values)
      localStorage.setItem('token',response.data.token)
      setServerErrors("")
      userDispatch({type:'SET_USER' , payload:response.data.user})
      setUserLogin()
      if(response.data.user?.role !== 'admin'){
        navigate('/live')
      }else{
        navigate('/dashboard')
      }
      loginNotify()
    }catch(err){
      console.log(err)
      setServerErrors(err.response.data.errors)
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4" >
        <h2 className="mb-4 d-flex align-items-center justify-content-between">Login
        <FontAwesomeIcon icon={faUser} className="ml-2" style={{color:'black'}} />
        </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
          <Form>
          {serverErrors?.length>0&&<p style={{color:'red'}}>{helperFunction('loginId')}</p>}
          {serverErrors?.length>0&&<p style={{color:'red'}}>{helperFunction('password')}</p>}

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

            <Button type="submit" >Login</Button><br/>
            <Link to='/forgot-password'>Forgot Password?</Link> <br /> <Link to='/register'>New User! Register Here </Link>
          </Form>
      </Formik>
      </div>
    </div>
  
  );
};

export default LoginForm;
