import React from 'react';
import '../login/login.css'
import Axios from 'axios';

class SignIn extends React.Component {

    //     
    constructor(props) {
        super(props)
        this.state = {

            firstName: '',
            lastName: '',
            emailAddress: '',
            pwd: '',
            Fnameerror: '',
            Lnameerror: '',
            Emailerror: '',
            Pwderror: '',

        }
    }

    getFname = (event) => {

        this.setState({ firstName: event.target.value })
        this.checkFname()
    }
    getLname = (event) => {

        this.setState({ lastName: event.target.value })
        this.checkLname()
    }
    getEmail = (event) => {
        this.setState({ emailAddress: event.target.value })
        this.checkEmail()
    }

    getPwd = (event) => {
        this.setState({ pwd: event.target.value })
        this.checkPwd()
    }


    addUser = async () => {
        let userRequest = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "emailAddress": this.state.emailAddress,

            "pwd": this.state.pwd,

        }
        const data = await Axios.get('http://localhost:3000/newuser?emailAddress=' + this.state.emailAddress);
        if (data.data.length !== 0) {
            if (this.state.emailAddress === data.data[0].emailAddress) {
                alert("email Address is already registered")
            }
        } else if (this.state.FnameError === '' && this.state.LnameError === '' && this.state.PwdError === '' && this.state.EmailError === '') {
            Axios.post("http://localhost:3000/newuser", userRequest)
                .then(response => {
                    console.log(response)
                    alert('SignIn Successfully')
                    this.props.history.push('/')
                }, error => {
                    console.log(error)
                })
        }





    }

    checkFname = () => {
        let Fnameerror = ''
        if (this.state.firstName.length <= 3) {
            Fnameerror = "* Name is too weak"
            this.setState({ FnameError: Fnameerror })
        }
        else {
            this.setState({ FnameError: '' })
        }
    }
    checkLname = () => {
        let Lnameerror = ''
        if (this.state.lastName.length <= 3) {
            Lnameerror = "* Name is too weak"
            this.setState({ LnameError: Lnameerror })
        }
        else {
            this.setState({ LnameError: '' })
        }
    }
    checkEmail = () => {
        let Emailerror = ''
        if (!this.state.emailAddress.includes('@' && '.co')) {
            Emailerror = "* Enter Valid Email"
            this.setState({ EmailError: Emailerror })
        }
        else {
            this.setState({ EmailError: '' })
        }

    }
    checkPwd = () => {
        let Pwderror = ''
        if (this.state.pwd.length <= 4) {
            Pwderror = "* Password is not strong"
            this.setState({ PwdError: Pwderror })
        }
        else {
            this.setState({ PwdError: '' })
        }
    }

    render() {
        return (
            <div >

                <form >
                    <fieldset style={{ padding: '10px' }}>
                        <center style={{ padding: '0px' }}>
                            <h2 >SignIn</h2>
                            <input type="text" placeholder="First Name" onChange={this.getFname} required style={{ margin: '10px' }}>
                            </input><div>{this.state.FnameError}</div>
                            <input type="text" placeholder="Last Name" onChange={this.getLname} required style={{ margin: '15px' }}></input>
                            <div>{this.state.LnameError}</div>
                            <input type="text" placeholder="Email Address" onChange={this.getEmail} required style={{ margin: '15px' }}></input>
                            <div>{this.state.EmailError}</div>
                            <input type="password" placeholder="Password" required onChange={this.getPwd} style={{ margin: '15px' }}></input>
                            <div>{this.state.PwdError}</div>

                            <button onClick={this.addUser}
                                style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'Pointer', padding: '10px' }}>SignIn</button><br></br>
                        </center>
                    </fieldset>
                </form>

            </div>
        );
    }
}

export default SignIn;