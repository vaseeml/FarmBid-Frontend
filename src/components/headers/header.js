import { Link,useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Navbar, Nav} from 'react-bootstrap';
import { isEmpty } from 'lodash';
import { useState } from 'react'
export default function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const toggle = () => setDropdownOpen(prevState => !prevState);

  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
};
    return (
        <Navbar bg="success" variant="dark" expand="lg">
            <Navbar.Brand><Nav.Link as={Link} to="/">FarmBid-Connect</Nav.Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
                <Nav className="ml-auto">
                    {(isEmpty(localStorage.getItem('token')))?(
                      <>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        <Nav.Link as={Link} to="/loginPage">Login</Nav.Link>
                        </>
                    ):(<Nav.Link onClick={handleLogout}>Logout</Nav.Link>)}
                    <Nav.Link href="#">Service</Nav.Link>
                </Nav>
            </Navbar.Collapse>
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
            !isEmpty(localStorage.getItem('token')) &&<DropdownItem onClick={handleLogout}>Logout</DropdownItem>
        }
        
      </DropdownMenu>
    </Dropdown>
        </Navbar>
    );
}