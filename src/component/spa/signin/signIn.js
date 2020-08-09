import React from 'react';
import '../login/login.css'
import Axios from 'axios';

class SignIn extends React.Component {
    
//     
constructor(props){
    super(props)
    this.state={
        
        firstName:'',
        lastName:'',
        emailAddress:'',
       
        pwd:'',
        Fnameerror:'',
        Lnameerror:'',
        Emailerror:'',
        Pwderror:'',
       
    }
}

getFname=(event)=>{
    // this.checkFname()
    this.setState({firstName:event.target.value})
   this.checkFname()
}
getLname=(event)=>{
    // this.checkLname()
    this.setState({lastName:event.target.value})
    this.checkLname()
}
getEmail=(event)=>{
    this.setState({emailAddress:event.target.value})
    this.checkEmail()
}

getPwd=(event)=>{
    this.setState({pwd:event.target.value})
    this.checkPwd()
}
// getStatus=(event)=>{
//     this.setState({productStatus:event.target.value})
// }

addUser=async()=>{
    let userRequest={
        "firstName":this.state.firstName,
        "lastName":this.state.lastName,
        "emailAddress":this.state.emailAddress,
        
        "pwd":this.state.pwd,
        
    }
    const data=await Axios.get('http://localhost:3000/newuser?emailAddress='+this.state.emailAddress);
    if(data.data.length!==0){
        if(this.state.emailAddress===data.data[0].emailAddress){
           alert("email Address is already registered")
        }
    }else if(this.state.FnameError===''&&this.state.LnameError===''&&this.state.PwdError===''&&this.state.EmailError===''){
        Axios.post("http://localhost:3000/newuser",userRequest)
        .then(response=>{
            console.log(response)
           alert('SignIn Successfully')
            this.props.history.push('/')
        },error=>{
            console.log(error)
        })
    }
    else{
        alert('Please,SignIn With Valid Details')
    }
   
}

checkFname=()=>{
    let Fnameerror=''
    if(this.state.firstName.length<=4){
        Fnameerror=" *Name is too weak"
        this.setState({FnameError:Fnameerror})
    }
    else{
        this.setState({FnameError:''})
    }
}
checkLname=()=>{
    let Lnameerror=''
    if(this.state.lastName.length<=4){
        Lnameerror=" *Name is too weak"
        this.setState({LnameError:Lnameerror})
    }
    else{
        this.setState({LnameError:''})
    }
}
checkEmail=()=>{
    let Emailerror=''
    if(!this.state.emailAddress.includes('@'&&'.co')){
        Emailerror=" *Enter Valid Email"
        this.setState({EmailError:Emailerror})
    }
    else{
        this.setState({EmailError:''})
    }
   
}
checkPwd=()=>{
    let Pwderror=''
    if(this.state.pwd.length<=4){
        Pwderror=" *Password is not strong"
        this.setState({PwdError:Pwderror})
    }
    else{
        this.setState({PwdError:''})
    }
}

render() { 
    return ( 
        <div >
           
            <form >
                <fieldset style={{padding:'10px'}}>
                <center style={{padding:'0px'}}>
            <h2 >SignIn</h2>
            <input type="text" placeholder="First Name" onChange={this.getFname}  style={{margin:'10px'}}>
               </input> {this.state.FnameError}<br></br>
            <input type="text" placeholder="Last Name" onChange={this.getLname} style={{margin:'15px'}}></input>
            {this.state.LnameError}<br></br>
            <input type="text" placeholder="Email Address" onChange={this.getEmail} style={{margin:'15px'}}></input>
            {this.state.EmailError}<br></br>
            {/* <input type="password" placeholder="New Password" onChange={this.getNewpwd} min="1"  style={{margin:'10px'}}></input><br></br> */}
            <input type="password" placeholder="Password" onChange={this.getPwd} style={{margin:'15px'}}></input>
            {this.state.PwdError}<br></br>
             {/* <select name="category" onChange={this.getCategory} style={{margin:'15px'}>
                 <option value="Mobiles">Mobiles</option>
                 <option value="Electronics">Electronics</option>
                 <option value="Clothes">Clothes</option></select> */}
            {/* <input type="text"placeholder="Status"onChange={this.getStatus} style={{margin:'15px'}}/><br></br> */}
            <button onClick={this.addUser} 
            style={{backgroundColor: '#4CAF50',color: 'white', border: 'none',borderRadius: '4px',cursor:'Pointer',padding:'10px'}}>SignIn</button><br></br>
            </center>
                </fieldset>
            </form>
           
        </div>
     );
}
}
 
export default SignIn;