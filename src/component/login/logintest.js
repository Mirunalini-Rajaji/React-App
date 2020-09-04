import Axios from "axios";
 
class LoginTest {
 api= () => {
 return Axios.get('http://localhost:4000/newuser').then((res) => {
 return res.data;
 })
 }
 
 
}
export default LoginTest;