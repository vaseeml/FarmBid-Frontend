import {useNavigate} from 'react-router-dom'
import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import swal from 'sweetalert'
export default function ForgotPassword() {
    const navigate=useNavigate()
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [phoneError,setPhoneError]=useState("")
  const [otpError,setOtpError]=useState("")
  const [passwordError,setPasswordError]=useState("")
  const [password,setPassword]=useState('')
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/send-otp", { phone });
    //   localStorage.setItem('phone',phone)
      console.log(response.data);
      setMessage("OTP sent successfully!");
      setShowOtpForm(true);
      setPhoneError("")
    } catch (err) {
      console.log(err);
      setPhoneError(err.response.data.errors)
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/verify-otp", { phone, otp });
      console.log(response.data);
      setMessage("OTP verified successfully!");
      setShowPasswordForm(true)
      swal('OTP Verified!' , `otp verified for phone no ${phone}` , 'success')
      setOtpError("")
    } catch (err) {
      console.log(err);
      setMessage("Failed to verify OTP. Please try again.");
      setOtpError(err.response.data.errors)
    }
  };
  const handlePassword=async(e)=>{
    e.preventDefault()
    // const mobile=localStorage.getItem('phone',phone)
    try{
        const formData={
            phone,
            password
        }
        const response=await axios.post('http://localhost:3000/api/update/password',formData)
        console.log(response.data)
        setMessage("Password updated successfully!");
        swal('Password Updated!', 'successufully' , 'success')
        setPasswordError("")
        navigate('/loginPage')
    }catch(err){
        console.log(err);
      setMessage("Failed to update password. Please try again.");
      setPasswordError(err.response.data.errors)
    }
  }
  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPhone">
          <Form.Label>Enter Phone Number:</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send OTP
        </Button>
        {phone.length<10&&<p style={{color:'red'}}>phone number is required</p>}
      {phoneError&&<p style={{color:'red'}}>{phoneError}</p>}
      </Form>
      {showOtpForm && (
        <Form onSubmit={handleOtp} className="mt-3">
          <Form.Group controlId="formOtp">
            <Form.Label>Enter OTP:</Form.Label>
            <Form.Control
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Verify OTP
          </Button>
          {otpError&&<p style={{color:'red'}}>{otpError}</p>}
        </Form>
      )}
      {showPasswordForm &&(
       <Form onSubmit={handlePassword} className="mt-3">
          <Form.Group controlId="formPassword">
            <Form.Label>Enter Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Password
          </Button>
          {passwordError&&<p style={{color:'red'}}>{passwordError}</p>}
        </Form>
      )}
      {message && <Alert variant="success" className="mt-3">{message}</Alert>}
      
    </div>
  );
}

