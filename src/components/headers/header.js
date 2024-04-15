import { Link,useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { isEmpty } from 'lodash';

export default function Header() {
  const navigate=useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
};
    return (
        <Navbar bg="success" variant="dark" expand="lg">
            <Navbar.Brand href="#">FarmBid Connect</Navbar.Brand>
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
        </Navbar>
    );
}
