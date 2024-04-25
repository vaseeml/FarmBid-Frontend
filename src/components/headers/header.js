import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../../assets/logo.png'
import { Dropdown, DropdownItem } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import axios from 'axios';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faUserCircle, faWallet } from '@fortawesome/free-solid-svg-icons';
import ConditionalLink from '../../Private-Routes/Rolebased';
import { useDispatch, useSelector } from 'react-redux';
import {  Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { getStartCompletedProducts, getStartLiveProducts, startGetUpComingProducts } from '../../actions/product-actions';

export default function Header({currentPath}) {
  const [modal, setModal] = useState(false);
  const [ updateAmount , setUpdateAmount ] = useState('')
  const [ searchQuery , setSearchQuery ] = useState('')
  const dispatch = useDispatch()
  const wallet = useSelector((state) => {
    return state.user?.wallet
  })
  const { user  } = useContext(AuthContext)
  const navigate = useNavigate()

  const toggle = () => {
    setModal(!modal)
  }
  const handleSearch = (e)=>{
    e.preventDefault()
    if(currentPath == '/live'){
      dispatch(getStartLiveProducts({role:user?.role, searchQuery:searchQuery}))
    }
    else if(currentPath == '/upcoming'){
      dispatch(startGetUpComingProducts({role:user?.role , searchQuery:searchQuery}))
    }
    else if(currentPath == '/completed'){
      dispatch(getStartCompletedProducts({role:user?.role , searchQuery:searchQuery}))
    }
  }
  const handleUpdateAmount = async(e)=>{
    // preventing page reload
    e.preventDefault()
    const formData = {
        amount:updateAmount,
        walletId:wallet._id
    }
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
  return (
    <Navbar bg="success" variant="dark" expand="lg" className="justify-content-between" style={{ height: '70px' }}>
      <Navbar.Brand style={{ marginLeft: '30px' }}><Nav.Link as={Link} to="/"><img
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
          <FormControl 
          type="text" 
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
          placeholder="Search..." 
          className="mr-sm-2" 
          style={{ borderRadius: '30px', width: "600px" }} 
          />
          <Button onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></Button>
          <Dropdown defaultActiveKey="1">
            <Dropdown.Toggle variant="success" id="dropdown-basic" title="Live">
                Live
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="1"><Nav.Link as={Link} to="/live">Live</Nav.Link></Dropdown.Item>
              <Dropdown.Item eventKey="2"><Nav.Link as={Link} to="/upcoming">UpComing</Nav.Link></Dropdown.Item>
              <Dropdown.Item eventKey="3"><Nav.Link as={Link} to="/completed">Completed</Nav.Link></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
          <Button variant="danger" className="d-flex align-items-center mx-3 " onClick={handleWallet}>
            <div className="rounded-circle  d-flex justify-content-center align-items-center" style={{ width: '20px', height: '20px', cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faWallet} style={{ fontSize: "1.5em", color: "white" }} />
            </div>
            <div className="ms-2" style={{ fontSize: '1.2rem', color: 'white' }}>
              ₹{!isEmpty(localStorage.getItem('token')) && wallet?.balance?.toFixed(2)}
            </div>
          </Button>
          {/* <h4 style={{fontSize: '1.2rem', color: 'black' }}>
          ₹{!isEmpty(localStorage.getItem('token')) && wallet?.balance?.toFixed(2)}
          </h4> 
          <FontAwesomeIcon icon={faWallet} onClick={handleWallet} style={{ fontSize: "1.5em", color: "white" }} className="mx-3" /> */}
          {ConditionalLink('/create-product', ['seller']) && <Nav.Link onClick={handleClick} className='btn btn-primary'>Create Product</Nav.Link>}
        </div>
      </Navbar.Collapse>

      {
        ConditionalLink('/cart', ['buyer']) && <FontAwesomeIcon icon={faShoppingCart}  style={{ fontSize: "1.5em", color: "orange" }} onClick={handleCart} />
      }
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <FontAwesomeIcon icon={faUserCircle} />
        </Dropdown.Toggle>
        <Dropdown.Menu align="end" placement="bottom-end">
          <Dropdown.Item header>Choose</Dropdown.Item>
          <Dropdown.Item><Nav.Link onClick={handleProfile}>My Profile</Nav.Link></Dropdown.Item>
          <Dropdown.Item>About Us</Dropdown.Item>
          <Dropdown.Item>See Trends</Dropdown.Item>
          <Dropdown.Item>Report</Dropdown.Item>
          <Dropdown.Item divider />
          {
            !isEmpty(localStorage.getItem('token')) && <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          }

        </Dropdown.Menu>
      </Dropdown>
      <div>
            {user?.role=='buyer' &&
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> Add Balance</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleUpdateAmount}>
                        <Form.Group controlId="walletAmount">
                        <Form.Label>Enter Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter amount"
                            value={updateAmount}
                            onChange={(e) => setUpdateAmount(e.target.value)}
                        />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                        Add
                        </Button>
                    </Form>

                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
            }
            
        </div>
    </Navbar>
    
  );
}

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Navbar, Nav,  FormControl, Button, Container, InputGroup } from 'react-bootstrap';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faShoppingCart, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
// import logo from '../../assets/logo.png';
// import { isEmpty } from 'lodash';

// export default function Header() {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');

//     const toggle = () => setDropdownOpen(prevState => !prevState);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         navigate('/');
//     };

//     const handleCart = () => {
//         navigate('/cart');
//     };

//     const handleSearch = () => {
//         // Handle search functionality, e.g., navigate to search results page with searchQuery
//         console.log('Searching for:', searchQuery);
//     };

//     return (
//         <Navbar bg="success" variant="dark" expand="lg">
//             <Container>
//                 <Navbar.Brand>
//                     <Link to="/">
//                         <img
//                             src={logo}
//                             alt="logo"
//                             width="50"
//                             height="50"
//                             className="d-inline-block shadow-sm align-text-top"
//                             style={{ borderRadius: '50%' }}
//                         />
//                     </Link>
//                 </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="navbarNav" />
//                 <Navbar.Collapse id="navbarNav" className="justify-content-center">
//                     <InputGroup className="mb-3">
//                         <FormControl
//                             placeholder="Search"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                         />
//                         <InputGroup.Append>
//                             <Button variant="outline-light" onClick={handleSearch}>
//                                 <FontAwesomeIcon icon={faSearch} />
//                             </Button>
//                         </InputGroup.Append>
//                     </InputGroup>
//                 </Navbar.Collapse>
//                 <Navbar.Collapse id="navbarNav" className="justify-content-end">
//                     <Nav>
//                         <Link className="nav-link" to="/create-product">
//                             Create Product
//                         </Link>
//                         {(isEmpty(localStorage.getItem('token'))) ? (
//                             <>
//                                 <Link className="nav-link" to="/register">Register</Link>
//                                 <Link className="nav-link" to="/loginPage">Login</Link>
//                             </>
//                         ) : (
//                             <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//                         )}
//                         <Nav.Link href="#">Service</Nav.Link>
//                     </Nav>
//                 </Navbar.Collapse>
//                 <FontAwesomeIcon
//                     icon={faShoppingCart}
//                     size="2x"
//                     color="blue"
//                     onClick={handleCart}
//                     style={{ cursor: 'pointer' }}
//                 />
//                 <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//                     <DropdownToggle caret>
//                         <div className="profile-icon">
//                             <FontAwesomeIcon icon={faUserCircle} style={{ color: '#007bff', fontSize: '2rem' }} />
//                         </div>
//                     </DropdownToggle>
//                     <DropdownMenu right>
//                         <DropdownItem header>Choose</DropdownItem>
//                         <DropdownItem>My Profile</DropdownItem>
//                         <DropdownItem>About Us</DropdownItem>
//                         <DropdownItem>Report</DropdownItem>
//                         {!isEmpty(localStorage.getItem('token')) && (
//                             <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
//                         )}
//                     </DropdownMenu>
//                 </Dropdown>
//             </Container>
//         </Navbar>
//     );
// }
