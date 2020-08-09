import React from 'react';
import './content.css'
import Axios from 'axios'
import Navbar from '../header/navbar';
class EditProduct extends React.Component {
    constructor(props){
        super(props)
        this.state={
            id:0,
            image:'',
            name:'',
            price:0,
            quantity:0,
            category:'',
            status:'',
            nameerror:'',
            priceerror:'',
            quantityerror:'',
            categoryerror:'',
            statuserror:''
        }
    }
    
    componentWillMount(){
        if(this.props.location.state !== undefined){
            Axios.get("http://localhost:3000/allProducts/"+this.props.location.state.myid).then(response=>{
                console.log(response)
                this.setState({
                    id:response.data.id,
                    image:response.data.image,
                    name:response.data.name,
                    price:response.data.price,
                    quantity:response.data.quantity,
                    category:response.data.category,
                    status:response.data.status
                })
            },error=>{
                console.log(error)
            })
        }
    }
   
   
    getName=(event)=>{
        this.setState({name:event.target.value})
        this.checkName()
    }
    getPrice=(event)=>{
        this.setState({price:event.target.value})
        // this.checkPrice()
    }
    getQuantity=(event)=>{
        this.setState({quantity:event.target.value})
        // this.checkQuantity()
    }
    getCategory=(event)=>{
        this.setState({category:event.target.value})
        // this.checkCategory()
    }
    getStatus=(event)=>{
        this.setState({status:event.target.value})
        // this.checkStatus()
    }
    checkName=()=>{
        let nameerror=''
        if(this.state.name.length<=2){
            nameerror="Give Valid Name"
            this.setState({nameError:nameerror})
        }else{
            this.setState({nameError:""})
        }
    }
    // checkPrice=()=>{
    //     let priceerror=''
    //     if(!this.state.price(Number)){
    //         priceerror="Give Valid price"
    //         this.setState({priceError:priceerror})
    //     }else{
    //         this.setState({priceError:""})
    //     }
    // }
    // checkQuantity=()=>{
    //     let quantityerror=''
    //     if(this.state.quantity(Number)){
    //         quantityerror="Add Quantity"
    //         this.setState({quantityError:quantityerror})
    //     }else{
    //         this.setState({quantityError:""})
    //     }
    // }
    // checkCategory=()=>{
    //     let categoryerror=''
    //     if(!this.state.category===''){
    //         categoryerror="Add category"
    //         this.setState({categoryError:categoryerror})
    //     }else{
    //         this.setState({categoryError:""})
    //     }
    // }
    // checkStatus=()=>{
    //     let statuserror=''
    //     if(!this.state.status===''){
    //         statuserror="Add Quantity"
    //         this.setState({statusError:statuserror})
    //     }else{
    //         this.setState({statusError:""})
    //     }
    // }

    editProduct=()=>{
        let productRequest={
            "id":this.state.id,
            "image":this.state.image,
            "name":this.state.name,
            "price":this.state.price,
            "quantity":this.state.quantity,
            "category":this.state.category,
            "status":this.state.status
        }
        if(this.state.nameError===''){
        // &&this.state.priceError===''&&this.state.quantityError===''&&this.state.categoryError===''&&
        // this.state.statusError==='')
            Axios.put("http://localhost:3000/allProducts/"+this.state.id,productRequest)
            .then(response=>{
                console.log(response)
                this.props.history.push('/products')
            },error=>{
                console.log(error)
            })

        }else{
            alert('Update details')
        }
    
       
    }
    goBack=()=>{
        this.props.history.push('/products')
    }
    render() { 
        if(this.props.location.state === undefined){
            return (
                <div>
                    <center>
                        <h3>Product Not Available!!</h3><br></br>
                        <button type="submit" onClick={this.goBack}>Go Back</button>
                    </center>
                </div>
            )
        }
        return ( 
            <div >
                <Navbar></Navbar>
                <form >
                    <fieldset style={{padding:'20px'}}>
                    <center style={{padding:'0px'}}>
                <h2>Update Product</h2>
                {/* <label for="productId">Product Id  :</label>
                <input type="text" placeholder="Product Id" value={this.state.id} onChange={this.getId}  style={{margin:'10px'}}></input><br></br> */}
                <label for="productName">Product Name </label>
                <input type="text" value={this.state.name} onChange={this.getName} style={{marginLeft:'3px'}}></input>
                {this.state.nameError}<br></br>
                <label for="price">Price </label>
                <input type="text" value={this.state.price} onChange={this.getPrice} style={{marginLeft:'57px'}}  ></input>
                {this.state.priceError}<br></br>
                <label for="quantity">Quantity </label>
                <input type="number" value={this.state.quantity} onChange={this.getQuantity} min="1"style={{marginLeft:'42px'}}  ></input>
                {this.state.quantityError}<br></br>
                <label for="category">Category </label>
                <input type="text"  value={this.state.category} onChange={this.getCategory}style={{marginLeft:'42px'}} ></input>
                {this.state.categoryError}<br></br>
                <label for="status">Status </label>
                <input type="text" value={this.state.status} onChange={this.getStatus}style={{marginLeft:'57px'}} />
                {this.state.statusError}<br></br>
                <button type="submit"onClick={this.editProduct}  >Update</button><br></br>
                </center>
                    </fieldset>
                </form>
               
            </div>
         );
    }
}
 
export default EditProduct;