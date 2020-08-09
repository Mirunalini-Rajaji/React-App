import React from 'react';
import  './login.css';
import { Link } from "react-router-dom";
import Axios from 'axios';

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            pwd:'',
            pwderror:'',
            buttonStatus:true,
            nameerror:''
        }
    }

    checkValidation=()=>{
       
        let nameerror = ''
        if( this.state.email.length<4){
            nameerror="* name too weak"
            // this.setState({ nameError: nameerror,
            //     buttonStatus: true})
        }
        //check for other conditions!
        if(nameerror){
            console.log('set state for nameError');
            this.setState({
                 nameError: nameerror,
                 buttonStatus: true
             })
            
            return false
        }
 
        this.setState({
            nameError:'',
            buttonStatus:false
         })
        return true
     }
     checkPwdValidation=()=>{
         let pwderror=''
         if(this.state.pwd>=7){
             pwderror="*Enter Valid Password"
         }
         if(pwderror){
             this.setState({
                 pwdError:pwderror,
                 buttonStatus:true
             })
             return false
         }
         this.setState({
            pwdError:'',
            buttonStatus:false
         })
        return true


     }
    //    else{
        
    //     this.setState({
    //         nameError:"",
    //         buttonStatus:false
    //      })}
 
    
    //  }
    // checkValidation=()=>{
        
    //     let name=this.state.name;
    //     let err=''
    //     if(name===""){
    //         err=<p>enter your name</p>;
    //         this.setState({errorMessage:err})
    //     }
    //     }
        getEmail=(event)=>{
            this.checkValidation()
        this.setState({email: event.target.value})
        this.checkValidation()
        }
        getPwd=(event)=>{
           // this.checkPwdValidation()
        this.setState({pwd: event.target.value})
       // this.checkValidation()
        }
    
    openDashboard=async()=>{
        const data=await Axios.get('http://localhost:3000/newuser?emailAddress='+this.state.email);
        if(data.data.length!==0){
            if(this.state.pwd===data.data[0].pwd){
                this.props.history.push('/dashboard')
            }
        }else{
            alert('Invalid User')
            
        }
       
    }

    render() { 
        return ( 
           
            <div >
                <form >
                   <fieldset style={{padding:'3px'}} >
                    <center>
                <h2 >Login</h2>
                <input type="text" placeholder="Email Address" onChange={this.getEmail} >
                    </input>{this.state.nameError}<br></br>
                <input type="password" placeholder="Password" onChange={this.getPwd}></input> {this.state.pwdError}<br></br>
                   
         <button type="submit" onClick={this.openDashboard} >Login</button><br></br>
             {/* <Link to="/dashboard" style={{textDecoration:"none",color:"Black"}}>Login</Link></button><br></br> */}
         <p>Don't have an account? <Link  to="/createaccount" style={{fontSize:"17px", color:"violet"}}>Create Account</Link></p>
         </center>
         </fieldset>  
                </form>
               
            </div>
          
         );
    }
}
 
export default Login;