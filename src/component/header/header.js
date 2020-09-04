import React from 'react';
import './header.css'
import { Link,withRouter } from 'react-router-dom'
// import Router from '../RootComponent';



class Header extends React.Component {
   
    logOut=(e)=>{
        e.preventDefault()
        localStorage.removeItem('userLogin');
        this.props.history.push('/')
    }
    render() {
        const loginUser=(
          
                <div className="header">
               <Link to ="#" className="logo">Inventory</Link>
                <div className="header-right">
                    <Link to="/dashboard" >Dashboard</Link>
                    <Link to="/Products" >Products</Link>
                    <Link to="/addproduct" >AddProducts</Link>
                    <Link to="/addcategory" >AddCategory</Link>
                    <Link to="#" onClick={this.logOut.bind(this)} >Logout</Link>
                </div>
            </div>
       
        )
        
           const user=(
            <div className="header">
             <Link to ="#" className="logo">Inventory</Link>
            </div>
            )
            return (
                <div>
                    {localStorage.userLogin?loginUser:user}
                   
                </div>
               
            )
        
    }
}

export default withRouter(Header);