
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // If you're using React Router

function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor:'#e9f9e6'}}>
                <div className="container">
                    <Link className="navbar-brand" to="/"><span className='logo-text'>FARMBID CONNECT</span></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <form className="form-inline my-2 my-lg-0 flex-grow-1">
                            <input className="form-control mr-sm-2 w-100" type="search" placeholder="Search" aria-label="Search" />
                        </form>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item px-5">
                                <Link className="nav-link" to="/home">Home</Link>
                            </li>
                            <li className="nav-item px-3">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item px-3">
                                <Link className="nav-link" to="/cart">
                                <FontAwesomeIcon icon={faShoppingCart} /> {/* Cart icon */}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            {/* Add more menu items as needed */}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
