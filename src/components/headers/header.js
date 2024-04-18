import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/logo.png'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { isEmpty } from 'lodash';
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
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
                <DropdownToggle >
                    ☰
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>Choose</DropdownItem>
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