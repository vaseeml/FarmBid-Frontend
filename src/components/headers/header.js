import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/logo.png'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { isEmpty } from 'lodash';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart , faUserCircle } from '@fortawesome/free-solid-svg-icons';
export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const navigate=useNavigate()
    const handleLogout = () => {
      // remove the token if user logged out
        localStorage.removeItem('token')
        navigate('/')
    };
    const handleCart = ()=>{
        // taking the cart page
        navigate('/cart')
    }

    return (
        <Navbar bg="success" variant="dark" expand="lg">
            <Navbar.Brand><Nav.Link as={Link} to="/"><img
            src={logo}
            alt="logo"
            width="50"
            height="50"
            className="d-inline-block shadow-sm align-text-top"
            style={{borderRadius: '50%'}}
          />
          {/* <span
            style={{
              marginLeft: '1px',
              fontSize: '2rem',
              fontWeight: 'italic',
              color: 'black',
              marginTop: '2px',
            }}
          >
            FarmBid-Connect
          </span> */}
          </Nav.Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
                <Nav className="ml-auto">
                    {(isEmpty(localStorage.getItem('token'))) ? (
                        <>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            <Nav.Link as={Link} to="/loginPage">Login</Nav.Link>
                        </>
                    ) : (<Nav.Link onClick={handleLogout}>Logout</Nav.Link>)}
                    <Nav.Link href="#">Service</Nav.Link>
                    <Nav.Link as={Link} to="/create-product">Create Product</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <FontAwesomeIcon icon={faShoppingCart} size="2x" color="blue"  onClick={handleCart}/>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                <div className="profile-icon" style={{color: '#007bff',fontsize: '2rem'}}>
                  {/* Profile icon with custom color */}
                  <FontAwesomeIcon icon={faUserCircle} />
                </div>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Choose</DropdownItem>
                    <DropdownItem>My Profile</DropdownItem>
                    <DropdownItem>About Us</DropdownItem>
                    <DropdownItem>Report</DropdownItem>
                    <DropdownItem divider />
                    {
                        !isEmpty(localStorage.getItem('token')) && <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                    }

                </DropdownMenu>
            </Dropdown>
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
