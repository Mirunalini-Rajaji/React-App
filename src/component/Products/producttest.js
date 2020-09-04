import Axios from "axios";
 
class ProductTest {
 api= () => {
 return Axios.get('http://localhost:3000/allProducts').then((res) => {
 return res.data;
 })
 }
 
 
}
export default ProductTest;