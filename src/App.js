import {  Route , Routes} from 'react-router-dom'
import { useEffect } from 'react'
import {getStartProduct,getStartLiveProducts, getStartCompletedProducts} from './actions/product-actions'
import { useDispatch } from 'react-redux'
import Home from './components/pages/home/Home'
import Header from './components/headers/header'
import LoginForm from './components/pages/registration/login'
import RegistrationForm from './components/pages/registration/registration'
import ForgotPassword from './components/pages/registration/forgotPassword'
import Dashboard from './components/pages/dashboard/dashboard'
import Orders from './components/pages/dashboard/orders'
import Admin from './components/pages/dashboard/admin'
import Rolebased from './components/pages/dashboard/Rolebased'
import { jwtDecode } from 'jwt-decode'


function App() {
  const dispatch = useDispatch()
    useEffect(()=>{
       const token = localStorage.getItem('token')
       if(token){
        const user = jwtDecode(token)
        if(user.role!=='admin'){
        dispatch(getStartLiveProducts(user.role))
        dispatch(getStartCompletedProducts(user.role))
        }
       }
       
        // dispatch after page is mounted
        dispatch(getStartProduct())
    },[dispatch])
  return (
    <div className="App">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginPage" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/login-success" element={<Rolebased/>}/>
          <Route path="/payment-success" element={<Rolebased/>}/>
          
        </Routes>
    
    </div>
  );
}

export default App;