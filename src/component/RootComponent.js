import React from 'react';
import { Switch, Route } from "react-router-dom";
import Dashboard from './dashboard/dashboard';
import Product from './Products/product';
import AddProduct from './Products/addproduct';
import Login from './login/login';
import SignIn from './signin/signIn';
import EditProduct from './Products/editProduct';
import Category from './category/category';



class Router extends React.Component {

    render() {
        return (
            <div>

                <Switch>
                    <Route exact path='/' component={Login}></Route>
                    <Route path='/createaccount' component={SignIn}></Route>
                    <Route path='/dashboard' component={Dashboard}></Route>
                    <Route path='/products' component={Product}></Route>
                    <Route path="/addproduct" component={AddProduct}></Route>
                    <Route path="/editproduct" component={EditProduct}></Route>
                    <Route path="/addcategory" component={Category}></Route>
                </Switch>
            </div>
        );
    }
}

export default Router;