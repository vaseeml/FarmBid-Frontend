
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getStartProduct, getStartLiveProducts, startGetUpComingProducts, getStartCompletedProducts } from './actions/product-actions'
import './App.css'
import { useDispatch } from 'react-redux'
import Home from './components/pages/home/Home'
import Header from './components/headers/header'
import LoginForm from './components/pages/registration/login'
import RegistrationForm from './components/pages/registration/registration'
import ForgotPassword from './components/pages/registration/forgotPassword'
import Orders from './components/pages/dashboard/orders'
import Rolebased from './Private-Routes/Rolebased'
import UpcomingProducts from './components/products/UpcomingProducts'
import LiveProducts from './components/products/LiveProducts'
import CompletedProducts from './components/products/CompletedProducts'
import CreateProduct from './components/products/CreateProduct'
import MyProduct from './components/pages/bid/MyProduct'
import Cart from './components/pages/cart/Cart'
import PaymentSuccess from './components/payments/PaymentSuccess'
import { startGetWallet, startGetProfile } from './actions/user-actions'
import Customers from './components/pages/dashboard/customer/Customers'
import { startGetAllProfiles } from './actions/admin-actions'
import ViewCustomer from './components/pages/dashboard/customer/ViewCustomer'
import ViewCustomerBids from './components/pages/dashboard/customer/ViewCustomerBids'
import Sellers from './components/pages/dashboard/sellers/Sellers'
import AllProducts from './components/pages/dashboard/sellers/allProducts'
import ViewSeller from './components/pages/dashboard/sellers/viewSeller'
import BlockedSellers from './components/pages/dashboard/sellers/BlockedSellers'
import CreateProfile from './components/pages/Profile/Profile'
import { useContext } from 'react'
import { AuthContext } from './contexts/AuthContext'
import PrivateRoute from './Private-Routes/PrivateRoutes'
import axios from 'axios'
import BidContainer from './components/pages/bid/BidContainer'
import Chart from './components/pages/dashboard/Chart'
import WalletTransactions from './components/pages/Profile/WalletTransaction'
import PaymentCancel from './components/payments/PaymentCancel'
import Footer from './components/pages/home/Footer'

function App() {
  const location = useLocation()
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentPath, setCurrentPath] = useState('')
  const dispatch = useDispatch()
  const { user, userDispatch } = useContext(AuthContext)
  useEffect(() => {
    (async () => {
      if (localStorage.getItem('token')) {
        try {
          const response = await axios.get('http://localhost:3000/api/user/account', {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          })
          userDispatch({ type: 'SET_USER', payload: response.data })
        } catch (err) {
          console.log(err)
        }
      }
    })();
  }, [userDispatch])
  useEffect(() => {
    // checking the token 
    const token = localStorage.getItem('token')

    if (token) {
      const auth = jwtDecode(token)
      // conditionally dispatching the functions to get data based on role
      console.log('user.role', user)
      if (auth?.role !== 'admin') {
        const role = auth?.role
        console.log('role11', auth?.role)
        dispatch(getStartLiveProducts({ role: role }))
        dispatch(getStartCompletedProducts({ role: role }))
        dispatch(startGetUpComingProducts({ role: role }))
        dispatch(startGetProfile())
        // passing id is optional
        dispatch(startGetWallet(auth?.id))
        dispatch(startGetProfile())
      }
      if (auth?.role === 'admin') {
        dispatch(startGetAllProfiles())
      }
    } else {
      // dispatch after page is mounted
      dispatch(getStartProduct())
    }
  }, [loggedIn])
  const setUserLogin = () => {
    setLoggedIn(!loggedIn)
  }
  useEffect(() => {
    console.log('current path', location.pathname)
    setCurrentPath(location.pathname)
  }, [location.pathname])
  return (
    <div className="App" >
      <Header currentPath={currentPath} />

      <Routes>
        <Route path="/" element={localStorage.getItem('token') ? <LiveProducts /> : <Home />} />
        <Route path="/loginPage" element={<LoginForm setUserLogin={setUserLogin} />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={
          <PrivateRoute permittedRoles={['admin']}>
            <Chart />
          </PrivateRoute>}
        />
        <Route path="/orders" element={
          <PrivateRoute permittedRoles={['admin']}>
            <Orders />
          </PrivateRoute>} />
        <Route path="/customers" element={
          <PrivateRoute permittedRoles={['admin']}>
            <Customers />
          </PrivateRoute>} />
        <Route path='/customer/:id/bids' element={
          <PrivateRoute permittedRoles={['admin']}>
            <ViewCustomerBids />
          </PrivateRoute>} />
        <Route path="/sellers" element={<PrivateRoute permittedRoles={['admin']}>
          <Sellers />
        </PrivateRoute>} />
        <Route path="/view/:id/seller" element={<PrivateRoute permittedRoles={['admin']}>
          <ViewSeller />
        </PrivateRoute>} />
        <Route path="/view/:id/customer" element={<PrivateRoute permittedRoles={['admin']}>
          <ViewCustomer />
        </PrivateRoute>} />
        <Route path="/blocked/sellers" element={<PrivateRoute permittedRoles={['admin']}>
          <BlockedSellers />
        </PrivateRoute>} />
        <Route path="/view/:id/products" element={<PrivateRoute permittedRoles={['admin']}>
          <AllProducts />
        </PrivateRoute>} />
        <Route path="/login-success" element={<Rolebased />} />
        <Route path="/createProfile" element={<PrivateRoute permittedRoles={['seller', 'buyer']}>
          <CreateProfile />
        </PrivateRoute>} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path='/upcoming' element={
          <PrivateRoute permittedRoles={['buyer', 'seller']}>
            <UpcomingProducts />
          </PrivateRoute>}
        />
        <Route path='/live' element={
          <PrivateRoute permittedRoles={['buyer', 'seller']}>
            <LiveProducts />
          </PrivateRoute>}
        />
        <Route path='/completed' element={
          <PrivateRoute permittedRoles={['buyer', 'seller']}>
            <CompletedProducts />
          </PrivateRoute>}
        />
        <Route path='/live/:id/myProduct' element={
          <PrivateRoute permittedRoles={['seller']}>
            <MyProduct />
          </PrivateRoute>}
        />
        <Route path='/live/:id/bid' element={
          <PrivateRoute permittedRoles={['buyer']}>
            <BidContainer />
          </PrivateRoute>}
        />
        <Route path='/cart' element={
          <PrivateRoute permittedRoles={['buyer']}>
            <Cart />
          </PrivateRoute>
        } />
        {/* <Route path='/view/:id/details' element={}/> */}

        <Route path='/create-product' element={
          <PrivateRoute permittedRoles={['seller']}>
            <CreateProduct />
          </PrivateRoute>
        } />
        <Route path='/transactions' element={
          <PrivateRoute permittedRoles={['buyer']}>
            <WalletTransactions />
          </PrivateRoute>}
        />
        <Route path='/payment-success' element={<PaymentSuccess />} />
        <Route path='/payment-cancel' element={<PaymentCancel />} />
      </Routes>
      <ToastContainer />
      <Footer/>
    </div>
  )
}

export default App;