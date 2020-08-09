import React from 'react';
import { Link } from 'react-router-dom';


class Sidebar extends React.Component {
    
    render() { 
        
        const sidenav = {
            height: '100%',
            width: '130px',
            position: 'fixed',
            zIndex:'1',
            top: '75px',
            left: '0',
            bottom:'0',
            backgroundColor: 'grey',
            color:'while',
            overflowX: 'hidden',
            padding: '50px'

        }

        return (  
            <span style={sidenav}>
                <h3>
                   
                <ul style={{listStyleType:'none'}}>
                    
                    <li style={{margin:' 45px 0px 20px'}} >
                        <Link to="/dashboard" style={{ textDecoration:'none'}}>Dashboard</Link>
                    </li>
                    <li style={{margin:' 45px 0px 20px'}}>
                        <Link to="/products" style={{ textDecoration:'none'}}>Products</Link>
                    </li>
                    <li style={{margin:'45px 0px 20px'}}> 
                        <Link to="/" style={{ textDecoration:'none'}}>Logout</Link>
                    </li>
                   
                   
                </ul>
                
                </h3>
            </span>

        );
    }
}
 
export default Sidebar;