import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import { Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';

const LoginForm = () => {
  const [serverErrors,setServerErrors]=useState([])
  const navigate=useNavigate()
  const initialValues = {
    loginId: '',
    password: '',
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    loginId: Yup.string().required('Email/Phone is required'),
    password: Yup.string().required('Password is required'),
  });

  // Handle form submission
  const handleSubmit = async(values) => {
    try{
      const response=await axios.post('http://localhost:3000/api/login',values)
      console.log(response.data)
      localStorage.setItem('token',response.data.token)
      setServerErrors("")
      window.location.reload()
    }catch(err){
      console.log(err)
      setServerErrors(err.response.data.errors)
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
          <Form>
            <FormGroup controlId="email">
              <FormLabel>Email</FormLabel>
              <Field
                type="text"
                name="loginId"
                placeholder="Enter email/phone"
                as={FormControl}
              />
              <ErrorMessage name="loginId" component="div" className="text-danger" />
            </FormGroup>

            <FormGroup controlId="password">
              <FormLabel>Password</FormLabel>
              <Field
                type="password"
                name="password"
                placeholder="Enter password"
                as={FormControl}
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </FormGroup>

            <Button type="submit" >Login</Button>
            <Link to='/forgot-password'>Forgot Password?</Link> <br /> <Link to='/register'>New User! Register Here </Link>
          </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
