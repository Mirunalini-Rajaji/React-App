import React from 'react';
import './header.css'
import {Link} from 'react-router-dom'



class Header extends React.Component {

    render() {

        return (
            <div className="header">
            <a href="/products" className="logo">Inventory</a>
            <div className="header-right">
            <Link to="/dashboard" >Dashboard</Link>
            <Link to="/Products" >Products</Link>
            <Link to="/addproduct" >AddProducts</Link>       
            <Link to="/addcategory" >AddCategory</Link>
            <Link to="/" >Logout</Link>
            </div>
            </div>
        );
    }
}

export default Header;