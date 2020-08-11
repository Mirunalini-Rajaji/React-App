import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'

class Navbar extends React.Component {


    render() {






        return (
            <div>

                <ul style={{ listStyleType: 'none' }}>
                    <li >
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link>
                    </li>
                    <li >
                        <Link to="/Products" style={{ textDecoration: 'none' }}>Products</Link>
                    </li>

                    <li >
                        <Link to="/" style={{ textDecoration: 'none' }}>Logout</Link>
                    </li>






                </ul>
            </div>
        );
    }
}

export default Navbar;