import { Route , Routes} from 'react-router-dom'
import Home from './components/pages/home/Home'
import { useEffect } from 'react'
import {getStartProduct} from './actions/product-actions'
import { useDispatch } from 'react-redux'

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
      </Routes>
    </div>
  );
}

export default App;
