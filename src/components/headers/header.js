import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../../assets/logo.png'
import { Dropdown, DropdownItem } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import axios from 'axios';
import { useState , useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faUserCircle, faWallet, faBars } from '@fortawesome/free-solid-svg-icons';
import ConditionalLink from '../../Private-Routes/Rolebased';
import { useDispatch, useSelector } from 'react-redux';
import {  Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { getStartCompletedProducts, getStartLiveProducts, searchQueryProducts, startGetUpComingProducts } from '../../actions/product-actions';
import OffCanvas from './OffCanvas';

export default function Header({currentPath}) {
  const [modal, setModal] = useState(false);
  const [ updateAmount , setUpdateAmount ] = useState('')
  const [ searchQuery , setSearchQuery ] = useState('')
  const [selectedOption, setSelectedOption] = useState("select");

  const dispatch = useDispatch()
  const wallet = useSelector((state) => {
    return state.user?.wallet
  })
  const setCity = useSelector((state)=>{
    return state.products.setCity
  })
  const { user  } = useContext(AuthContext)
  const navigate = useNavigate()

  // handles
  const handleSelect = (eventKey) => {
        setSelectedOption(eventKey);
    }
  const toggle = () => {
    setModal(!modal)
  }
  const handleSearch = ()=>{

  }
  useEffect(()=>{
    (()=>{
      if(searchQuery.length >=3 || searchQuery.length === 0){
        if(currentPath == '/live'){
          dispatch(searchQueryProducts({role:user?.role, searchQuery:searchQuery , setCity:setCity}))
        }
        else if(currentPath == '/upcoming'){
          dispatch(startGetUpComingProducts({role:user?.role , searchQuery:searchQuery , setCity:setCity}))
        }
        else if(currentPath == '/completed'){
          dispatch(getStartCompletedProducts({role:user?.role , searchQuery:searchQuery}))
        }
      }
    }
    )();
  },[searchQuery])
  

  const handleUpdateAmount = async(e)=>{
    // preventing page reload
    e.preventDefault()
    const formData = {
        amount:updateAmount,
        walletId:wallet._id
    }
    if(localStorage.getItem('token')){
      try{
        // post request for making payment
        const response = await axios.post('http://localhost:3000/api/create-checkout-session' ,formData, { headers:{
            'Authorization':localStorage.getItem('token')
        }})
        // setting the localStorage stripe id with response
        localStorage.setItem('stripeId' , response.data.id)
        // taking to the payment page with url by stripe
        window.location = response.data.url
    } catch(err){
        console.log(err)
    }
    } else{
      navigate('/loginPage')
    }
  }
 
  const handleTransactionHistory = ()=>{
    if(localStorage.getItem('token')){
      navigate('/transactions')
    } else{
      navigate('/loginPage')
    }
  }
  const handleLogout = () => {
    // remove the token if user logged out
    localStorage.removeItem('token')
    navigate("/loginPage")
  };
  const handleCart = () => {
    // taking the cart page
    if(localStorage.getItem('token')){
      navigate('/cart')
      }else{
        navigate('/loginpage')
      }
  }
  const handleClick=()=>{
    if(localStorage.getItem('token')){
    navigate('/create-product')
    }else{
      navigate('/loginpage')
    }
}
const handleProfile=()=>{
  if(localStorage.getItem('token')){
  navigate('/createProfile')
  }else{
    navigate('/loginpage')
  }
}
const handleWallet=()=>{
  if(localStorage.getItem('token')){
    toggle()
    }else{
      navigate('/loginpage')
    }
}
const handleSetAmount = (value)=>{
  setUpdateAmount(value)
}
  return (
    <>
    <Navbar style={{ backgroundColor: 'lightgreen' , height: '70px'}}  variant="light" expand="lg" className="justify-content-between" >
      {/* {user?.role=='admin' && <button onClick={handleBar}>hi</button>} */}
      <Navbar.Brand style={{ marginLeft: '30px' }}><Nav.Link as={Link} to={localStorage.getItem('token') ?user?.role == 'admin' ? '/dashboard':'/live' : '/'}><img
        src={logo}
        alt="logo"
        width="80"
        height="70"
        className="d-inline-block shadow-sm align-text-top"
        style={{ borderRadius: '50%' }}
      />
      </Nav.Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav" className="justify-content-end">

        <Form inline className="d-flex justify-content-center">

          { user?.role !== 'admin' && <FormControl 
          type="text" 
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
          placeholder="Search..." 
          className="mr-sm-2" 
          style={{ borderRadius: '30px', width: "600px" }} 
          />}
          { user?.role !== 'admin' && <Button onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></Button>}

          {user?.role!=='admin' && 
           <Dropdown onSelect={handleSelect}>
           <Dropdown.Toggle variant="success" id="dropdown-basic">
               {selectedOption}
           </Dropdown.Toggle>
           <Dropdown.Menu>
               <Dropdown.Item eventKey="Live">
                   <Nav.Link as={Link} to="/live">Live</Nav.Link>
               </Dropdown.Item>
               <Dropdown.Item eventKey="Upcoming">
                   <Nav.Link as={Link} to="/upcoming">Upcoming</Nav.Link>
               </Dropdown.Item>
               <Dropdown.Item eventKey="Completed">
                   <Nav.Link as={Link} to="/completed">Completed</Nav.Link>
               </Dropdown.Item>
           </Dropdown.Menu>
       </Dropdown>
          // <Dropdown activeKey="Live">
          //   <Dropdown.Toggle variant="success" id="dropdown-basic" title="Live">
          //       Select
          //   </Dropdown.Toggle>
          //   <Dropdown.Menu>
          //     <Dropdown.Item eventKey="Live"><Nav.Link as={Link} to="/live">Live</Nav.Link></Dropdown.Item>
          //     <Dropdown.Item eventKey="Upcoming"><Nav.Link as={Link} to="/upcoming">UpComing</Nav.Link></Dropdown.Item>
          //     <Dropdown.Item eventKey="Completed"><Nav.Link as={Link} to="/completed">Completed</Nav.Link></Dropdown.Item>
          //   </Dropdown.Menu>
          // </Dropdown>
        }
        </Form>
      </Navbar.Collapse>
      <Navbar.Collapse id="navbarNav" className="justify-content-end">
        <div className="d-flex align-items-center">
          {(isEmpty(localStorage.getItem('token'))) && (
            <div className="d-flex align-items-center" style={{ marginRight: '20px' }}>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <span className="mx-2">|</span>
              <Nav.Link as={Link} to="/loginPage">Login</Nav.Link>
            </div>
          )}
          {user?.role!=='admin' &&<Button variant="danger" type="button" className="d-flex align-items-center mx-3 " aria-controls="offcanvasRight" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" onClick={handleWallet}>
            <div className="rounded-circle  d-flex justify-content-center align-items-center" style={{ width: '20px', height: '20px', cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faWallet} style={{ fontSize: "1.5em", color: "white" }} />
            </div>
            <div className="ms-2" style={{ fontSize: '1.2rem', color: 'white' }}>
              ₹{!isEmpty(localStorage.getItem('token')) && wallet?.balance?.toFixed(2)}
            </div>
          </Button>
          }
          {user?.role == 'seller' && <Nav.Link onClick={handleClick} ><Button className='btn btn-success'>CREATE PRODUCT</Button></Nav.Link>}
        </div>
      </Navbar.Collapse>

      {
        user?.role == 'buyer' && <FontAwesomeIcon icon={faShoppingCart}  style={{ fontSize: "1.5em", color: "orange" }} onClick={handleCart} />
      }
      {user?.role!=='admin' && <Dropdown>
        <Dropdown.Toggle variant="white" id="dropdown-basic">
          <FontAwesomeIcon icon={faUserCircle} />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end" placement="bottom-end">
          <Dropdown.Item header>Choose</Dropdown.Item>
          <Dropdown.Item><Nav.Link onClick={handleProfile}>My Profile</Nav.Link></Dropdown.Item>
          { user?.role == 'buyer' && <Dropdown.Item><Nav.Link onClick={handleTransactionHistory}>Transaction History</Nav.Link></Dropdown.Item>}
          { user?.role == 'buyer' && <Dropdown.Item><Nav.Link as={Link} to="/report">Report</Nav.Link></Dropdown.Item>}
          <Dropdown.Item divider />
          {
            !isEmpty(localStorage.getItem('token')) && <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          }

        </Dropdown.Menu>
      </Dropdown>}

      {user?.role=='admin' && !isEmpty(localStorage.getItem('token')) &&<> 
      <Dropdown>
        <Dropdown.Toggle style={{ backgroundColor: 'lightdark' }}  id="dropdown-basic">
          <FontAwesomeIcon icon={faBars} />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end" placement="bottom-end">
          <Dropdown.Item header>Choose</Dropdown.Item>
          <Dropdown.Item><Nav.Link as={Link} to="/sellers">Sellers</Nav.Link></Dropdown.Item>
          <Dropdown.Item><Nav.Link as={Link} to="/customers">Buyers</Nav.Link></Dropdown.Item>
          <Dropdown.Item><Nav.Link as={Link} to="/view/reports">Reports</Nav.Link></Dropdown.Item>
          <Dropdown.Item divider />
          {
            !isEmpty(localStorage.getItem('token')) && <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          }

        </Dropdown.Menu>
      </Dropdown>
              </>
        }
      {/* <div>
            {user?.role=='buyer' &&
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Add Balance</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group controlId="walletAmount">
                        <Form.Label>Enter Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter amount"
                            value={updateAmount}
                            onChange={(e) => setUpdateAmount(e.target.value)}
                        />
                        </Form.Group>
                        
                    </Form>

                </ModalBody>
                <ModalFooter>
                <Button variant="primary" onClick={handleUpdateAmount}>
                    Add
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
            }
            
        </div> */}
    </Navbar>
    <OffCanvas handleUpdateAmount={handleUpdateAmount} handleSetAmount={handleSetAmount} updateAmount={updateAmount} wallet={wallet?.balance?.toFixed(2)}/>
    </>
  );
}