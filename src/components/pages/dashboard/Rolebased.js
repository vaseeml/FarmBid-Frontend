import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Import the JWT decoding library
import Dashboard from './dashboard';
import Buyer from './buyer';
import LiveProducts from '../LiveProducts';

const Rolebased = () => {
    const [userRole, setUserRole] = useState(null);
    const navigate=useNavigate()
    const token=localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            // Decode the JWT token to extract the user's role
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;
            setUserRole(role);
            
        }
    }, [token]);

    const renderDashboard = () => {
        switch (userRole) {
            case 'admin':
                return <Dashboard/>;
            case 'seller':
                return <LiveProducts/>;
            case 'buyer':
                return <LiveProducts/>;
            default:
                // Redirect to login page if role is not recognized or token is missing
                return navigate('/loginPage')
        }
    };

    return (
        <div>
            <h1>Welcome to Dashboard</h1>
            {userRole ? renderDashboard() : <p>Loading...</p>}
        </div>
    );
};

export default Rolebased;
