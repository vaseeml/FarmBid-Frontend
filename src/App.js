import './App.css'
import { Route , Routes} from 'react-router-dom'
import Home from './components/pages/home/Home'
import Login from './components/auth/Login'
import { useEffect } from 'react'
import {getStartProduct} from './actions/product-actions'
import { useDispatch } from 'react-redux'
import Header from './components/auth/Header'

function App() {
  const dispatch = useDispatch()
    useEffect(()=>{
        // dispatch after page is mounted
        dispatch(getStartProduct())
    },[dispatch])
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/header' element={<Header/>}/>
      </Routes>
    </div>
  );
}

export default App;
