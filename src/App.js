import {  Route , Routes} from 'react-router-dom'
import Home from './components/pages/home/Home'
import { useEffect } from 'react'
import {getStartProduct} from './actions/product-actions'
import { useDispatch } from 'react-redux'
import Header from './components/headers/header'
import LoginForm from './components/pages/registration/login'
import RegistrationForm from './components/pages/registration/registration'
import ForgotPassword from './components/pages/registration/forgotPassword'
import Dashboard from './components/pages/dashboard/dashboard'
import Orders from './components/pages/dashboard/orders'
import Admin from './components/pages/dashboard/admin'
import Rolebased from './components/pages/dashboard/Rolebased'

function App() {
  const dispatch = useDispatch()
    useEffect(()=>{
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