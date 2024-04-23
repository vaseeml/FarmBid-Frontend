import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'
import { Link , useNavigate } from "react-router-dom";
import axios from 'axios'
import { useState } from "react";
import { registrationNotify } from "../../Notify";
export default function RegistrationForm(){
    const [serverErrors,setServerErrors]=useState([])
    const navigate = useNavigate()
    const helperFunction=(name)=>{
       return serverErrors.filter((ele)=>{
            return ele.path===name
        }).map((ele,i)=>{
            return<li key={i}>{ele.msg}</li>
        })
    }

    return(
        <div>
            <h2>Registration Form</h2>
            <Formik
            initialValues={{username:'',email:'',phone:'',password:'',role:''}}
            validationSchema={Yup.object({
                username:Yup.string()
                        .max(15,'Must be 15 characters or less')
                        .required('Required'),
                email:Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                phone:Yup.string()
                        .matches(/^[0-9]{10}$/, 'Must be of 10 digits')
                        .required('Required'),
                password:Yup.string()
                        .min(8, 'min 8 characters')
                        .max(128, 'min 128 characters')
                        .required('Required')
                        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])/, 'At least one Capital Letter, small letter, digit and symbol'),
                role: Yup.string().required('Required')
            })}
            
            onSubmit={async (values) => {
                try {
                    const response = await axios.post("http://localhost:3000/api/register", values)
                    registrationNotify()
                    navigate('/loginPage')
                } catch (err) {
                    console.log(err)
                    setServerErrors(err.response.data.errors)
                }
            }}
            >
            {formikProps=>(
            <Form className="form-control">
                <label className="form-label" htmlFor="username">Username</label>
                <Field className="form-control" name="username" type="text" id="username"/>
                <ErrorMessage className="text-danger" component="div" name="username"/>
                {formikProps.values.username.length===0&& <p style={{color:'red'}}>{helperFunction('username')}</p>}

                <label className="form-label" htmlFor="email">Email</label>
                <Field className="form-control" name="email" type="text" id="email"/>
                <ErrorMessage className="text-danger" component="div" name="email"/>
                {/* {formikProps.values.email.length==0&& <p style={{color:'red'}}>{helperFunction('email')}</p>} */}
                {serverErrors.length>0 && <p style={{color:'red'}}>{helperFunction('email')}</p>}

                <label className="form-label" htmlFor="phone">Phone</label>
                <Field className="form-control" name="phone" type="text" id="phone"/>
                <ErrorMessage className="text-danger" component="div" name="phone"/>
                {/* {formikProps.values.phone.length==0&& <p style={{color:'red'}}>{helperFunction('phone')}</p>} */}
                {serverErrors.length>0 && <p style={{color:'red'}}>{helperFunction('phone')}</p>}

 
                <label className="form-label" htmlFor="password">Password</label>
                <Field className="form-control" name="password" type="text" id="password"/>
                <ErrorMessage className="text-danger" component="div" name="password"/>
                {formikProps.values.password.length===0&& <p style={{color:'red'}}>{helperFunction('password')}</p>}
                <article className='indicate-warning'>
                    <p>**Password requires UpperCase, LowerCase, Digit, and Symbol, minimally.</p>
                </article>

                <div>
                    <label id="role-radio" className='form-label'>Role: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <span role="group" aria-labelledby="role-radio">
                    <Field className="form-check-input" type="radio" name="role" value="seller" id="seller"/> &nbsp;
                        <label for="seller">
                                Seller
                        </label>  &nbsp; &nbsp;&nbsp;&nbsp;
                        <Field className="form-check-input" type="radio" name="role" value="buyer" id="buyer" /> &nbsp;
                        <label for="buyer">
                                Buyer
                        </label>
                        </span> &nbsp;
                        <ErrorMessage className="text-danger" component="div" name="role" />
                        {formikProps.values.role.length===0&& <p style={{color:'red'}}>{helperFunction('role')}</p>}
                </div>
                <button type="submit" className='btn btn-primary form-control'>Submit</button> <br />
                <Link to='/loginPage'>Already have an account? Login here</Link> <br />
            </Form>
            )}
            </Formik>
        </div>
    )
}