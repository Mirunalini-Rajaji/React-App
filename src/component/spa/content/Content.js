import React from 'react';
import { Switch, Route } from "react-router-dom";
import Dashboard from './dashboard';
import Product from './product';
import AddProduct from './addproduct';
import Login from '../login/login';
import SignIn from '../signin/signIn';
import EditProduct from './editProduct';




class Content extends React.Component {
    
    render() { 
        return ( 
            <div>
              
            <Switch>
                <Route exact path='/' component={Login}></Route>
                <Route   path='/createaccount' component={SignIn}></Route>
                <Route   path='/dashboard' component={Dashboard}></Route>
                <Route   path='/products' component={Product}></Route>
                <Route path="/addproduct" component={AddProduct}></Route>
                <Route path="/editproduct" component={EditProduct}></Route>
                
            </Switch>
            </div>
         );
    }
}
 
export default Content;