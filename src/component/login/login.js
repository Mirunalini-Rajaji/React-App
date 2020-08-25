import React from 'react';
import './login.css';
import { Link } from "react-router-dom";
import Axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            pwd: '',
            pwderror: '',

            emailerror: ''
        }
    }


    getEmail = (event) => {
        this.setState({ email: event.target.value })
    }
    getPwd = (event) => {
        this.setState({ pwd: event.target.value })
    }

    openDashboard = async () => {

        const data = await Axios.get('http://localhost:3000/newuser?emailAddress=' + this.state.email);
        if (data.data.length !== 0) {
            if (this.state.pwd === data.data[0].pwd) {
                this.props.history.push('/dashboard')
            } else {
                alert("Wrong Password")

            }

        }
        else {
            alert("invalid user")
        }

    }

    render() {
        return (

            <div >


                <h1 data-testid='h1'>Inventory</h1>

                <form >
                   
                    <center style={{ padding: '20px' }}>

                        <h2 >Login</h2>

                        <input type="text" placeholder="Email Address" required onChange={this.getEmail} >
                        </input><br></br>
                        <input type="password" placeholder="Password" required onChange={this.getPwd}></input> <br></br>

                        <button type="submit" onClick={this.openDashboard} >Login</button><br></br>
                        
                        <p data-testid='p'>Dont have an account? <Link to="/createaccount" style={{ fontSize: "17px", color: " rgb(40, 2, 90)" }}>Create Account</Link></p>
                    </center>
                   
                </form>

            </div>

        );
    }
}

export default Login;