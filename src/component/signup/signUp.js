import React from 'react';
import '../login/login.css'
import Axios from 'axios';



class SignIn extends React.Component {

       
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
            success:false,
            verifyerror:''
        }
    }

    getFname = (event) => {
        let value = event.target.value
        value = value.replace(/[^A-Za-z]/ig, '')
        this.setState({ firstName: value })

        this.checkFname()
    }
    getLname = (event) => {
        let value = event.target.value
        value = value.replace(/[^A-Za-z]/ig, '')
        this.setState({ lastName: value })
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


    addUser = async (e) => {
        e.preventDefault()
        let userRequest = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "emailAddress": this.state.emailAddress,

            "pwd": this.state.pwd,

        }
        const data = await Axios.get('http://localhost:4000/newuser?emailAddress=' + this.state.emailAddress);
        if (data.data.length !== 0) {
            if (this.state.emailAddress === data.data[0].emailAddress) {
                // alert("email Address is already registered")
                let verifyerror="* Email address is already registered"
                this.setState({verifyError:verifyerror})
            }
        } else if (this.state.FnameError === '' && this.state.LnameError === '' && this.state.PwdError === '' && this.state.EmailError === '') {
            Axios.post("http://localhost:4000/newuser", userRequest)
                .then(response => {
                    console.log(response)
                   this.setState({success:true})
                    // this.props.history.push('/')
                }, error => {
                    console.log(error)
                })
        }





    }

    checkFname = () => {
        let Fnameerror = ''
        if (this.state.firstName.length <= 3) {
            Fnameerror = "* Name must be an alphabet and greater than 4"
            this.setState({ FnameError: Fnameerror })
        }
        else {
            this.setState({ FnameError: '' })
        }
    }
    checkLname = () => {
        let Lnameerror = ''
        if (this.state.lastName.length <= 3) {
            Lnameerror = "* Name must be an alphabet and greater than 4"
            this.setState({ LnameError: Lnameerror })
        }
        else {
            this.setState({ LnameError: '' })
        }
    }

    checkEmail = () => {
        
        let Emailerror = ''
        if (this.state.emailAddress==='') {
            Emailerror = "Email must be in abc@example.com"
            this.setState({ EmailError: Emailerror })

        } else {
            this.setState({ EmailError: '' })
        }
       
    }
    checkPwd = () => {
        let Pwderror = ''
        if (this.state.pwd.length <= 4) {
            Pwderror = "* Password must have one  number and one uppercase and lowercase letter, and greater than 8 character"
            this.setState({ PwdError: Pwderror })
        }
        else {
            this.setState({ PwdError: '' })
        }
    }
    continue=()=>{
        this.props.history.push('/')
    }

    render() {
        if(this.state.success){
            return (
              
                    <div style={{ textAlign: 'center', paddingTop: '50px'}}>
                        <h3>Account Created Successfully!!</h3>
                        <h4>Click continue to Login</h4>
                        <button type="submit" onClick={this.continue}>Continue</button>
                    </div>
               
            )
        }

        return (

            <div >
               

                <form onSubmit={this.addUser}>
                  
                    <center style={{ padding: '20px' }}>
                        <h2 data-testid='h2' >SignUp</h2>
                        <input type="text" placeholder="First Name" onChange={this.getFname} required >
                        </input><div>{this.state.FnameError}</div>
                        <input type="text" placeholder="Last Name" onChange={this.getLname} required ></input>
                        <div>{this.state.LnameError}</div>
                        <input type="text" placeholder="Email Address" onChange={this.getEmail} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required ></input>
                        <div>{this.state.EmailError}</div>
                        <div className="error">{this.state.verifyError}</div>
                        <input type="password" placeholder="Password" required onChange={this.getPwd} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" ></input>
                        <div>{this.state.PwdError}</div>

                        <button type="submit">SignUp</button><br></br>
                    </center>
                   
                </form>

            </div>
        );
    }
}

export default SignIn;