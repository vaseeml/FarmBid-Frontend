import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Dashboard() {
    // const location = useLocation();
    const navigate=useNavigate()
    const profiles = useSelector((state) => {
        return state.admin.profiles.filter(ele => ele.userId?.role == 'seller')
    })
    const profiles1 = useSelector((state) => {
        return state.admin.profiles.filter(ele => ele.userId?.role == 'buyer')
    })
    const handleSellers=()=>{
        navigate('/sellers')
    }
    const handleBuyers=()=>{
        navigate('/customers')
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundImage: `url('https://www.actuall.eu/wp-content/uploads/2016/07/background-images-for-websites-23.jpg')`, backgroundSize: 'cover' }}
        >
        <div className="container">
      <div className="row">
        <div className="col-md-6" onClick={handleBuyers}>
          <div className="card p-4" style={{width:'400px'}}>
            <h2 className="mb-4 d-flex align-items-center justify-content-between">
              Buyers-{profiles1?.length}
              <FontAwesomeIcon icon={faUser} className="ml-2" style={{ color: 'black' }} />
            </h2>
          </div>
        </div>
        <div className="col-md-6" onClick={handleSellers}>
          <div className="card p-4" style={{width:'400px'}}>
            <h2 className="mb-4 d-flex align-items-center justify-content-between">
              Sellers-{profiles?.length}
              <FontAwesomeIcon icon={faUser} className="ml-2" style={{ color: 'black' }} />
            </h2>
          </div>
        </div>
      </div>
    </div>
    </div>
        // <div className='d-flex'>
        //     <div className="sidebar d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{ width: "200px", height: "600px" }}>
        //         <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        //             <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
        //             <span className="fs-4">Sidebar</span>
        //         </Link>
        //         <hr />
        //         <ul className="nav nav-pills flex-column mb-auto">
        //             <li className="nav-item">
        //                 <a href="#" className="nav-link link-body-emphasis" aria-current="page">
        //                     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
        //                     Home
        //                 </a>
        //             </li>
        //             <li>
        //                 <a href="#" className={`nav-link${location.pathname === '/#' ? ' active' : ''}`}>
        //                     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
        //                     Dashboard
        //                 </a>
        //             </li>
        //             <li>
        //                 <Link to="/orders" className={`nav-link${location.pathname === '/orders' ? ' active' : ''}`}>
        //                     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
        //                     Orders
        //                 </Link>
        //             </li>
        //             <li>
        //                 <a href="#" className={`nav-link${location.pathname === '/#' ? ' active' : ''}`}>
        //                     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
        //                     Products
        //                 </a>
        //             </li>
        //             <li>
        //                 <Link to="/customers" className={`nav-link${location.pathname === '/customers' ? ' active' : ''}`}>
        //                     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
        //                     Customers
        //                 </Link>
        //             </li>
        //             <li>
        //                 <Link to="/sellers" className={`nav-link${location.pathname === '/sellers' ? ' active' : ''}`}>
        //                     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
        //                     Sellers
        //                 </Link>
        //             </li>
        //             <li>
        //                 <Link to="/blocked/sellers" className={`nav-link${location.pathname === '/blocked/sellers' ? ' active' : ''}`}>
        //                     <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
        //                     Blocked Sellers
        //                 </Link>
        //             </li>
        //         </ul>

        //     </div>
        // </div>
    );
}



