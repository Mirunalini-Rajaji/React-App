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
            emailerror: '',
            wrongerror:'',
            invaliderror:''
        }
    }


    getEmail = (event) => {
        this.setState({ email: event.target.value })
    }
    getPwd = (event) => {
        this.setState({ pwd: event.target.value })
    }

    openDashboard = async (e) => {
        e.preventDefault()
        const data = await Axios.get('http://localhost:4000/newuser?emailAddress=' + this.state.email);
        if (data.data.length !== 0) {
            if (this.state.pwd === data.data[0].pwd) {
                localStorage.setItem('userLogin',true)
                this.props.history.push('/dashboard')
            // }
            } else {
                // alert("Wrong Password")
                let wrongerror="* Wrong Password"
                this.setState({wrongError:wrongerror})
            }
           
        }
        else {
            // alert("invalid user")
            let invaliderror="* Invalid User"
            this.setState({invalidError:invaliderror})
        }
       
    }

    render() {
        return (

            <div >


               

                <form >
               
                    <center style={{ padding: '20px' }}>

                        <h2 >Login</h2>
                       
                        <input type="text" placeholder="Email Address" required onChange={this.getEmail} >
                        </input><br></br>
                        <input type="password" placeholder="Password" required onChange={this.getPwd}></input> 
                        <div className="error">{this.state.wrongError}</div>
                        <div className="error">{this.state.invalidError}</div>
                        <button type="submit" onClick={this.openDashboard} >Login</button><br></br>
                        
                        <p data-testid='p'>Dont have an account? <Link to="/createaccount" style={{ fontSize: "17px", color: " rgb(40, 2, 90)" }}>Create Account</Link></p>
                    </center>
                   
                </form>

            </div>

        );
    }
}

export default Login;