import React from 'react';

import './content.css'
import Axios from 'axios';
import Navbar from '../header/navbar';

class AddProduct extends React.Component {
    constructor(props){
        super(props)
        this.state={
            productId:0,
            productImage:'',
            productName:'',
            productPrice:0,
            productQuantity:0,
            productCategory:'',
            productStatus:'',
            iderror:'',
            nameerror:'',
            
           
            statuserror:'',
            categoryerror:''
        }
    }

    getId=(event)=>{
        this.setState({productId:event.target.value})
        // this.checkId()
    }
    getName=(event)=>{
        this.setState({productName:event.target.value})
        this.checkName()
    }
    getPrice=(event)=>{
        this.setState({productPrice:event.target.value})
        // this.checkPrice()
    }
    getQuantity=(event)=>{
        this.setState({productQuantity:event.target.value})
       
    }
    getCategory=(event)=>{
        this.setState({productCategory:event.target.value})
        this.checkCategory()
    }
    getStatus=(event)=>{
        this.setState({productStatus:event.target.value})
        this.checkStatus()
    }
    getImage=(event)=>{
        console.log(event.target.value.substr(12))
        this.setState({productImage:event.target.value.substr(12)})
        this.checkImage()
    }

    checkId=()=>{
        let iderror=''
        if(this.state.productId.includes('*')){
            iderror="Give Unique Id"
            this.setState({idError:iderror})
        }else{
            this.setState({idError:""})
        }
    }
    checkName=()=>{
        let nameerror=''
        if(this.state.productName.length<1){
            nameerror="Give Valid Name"
            this.setState({nameError:nameerror})
        }else{
            this.setState({nameError:""})
        }
    }
    // checkPrice=()=>{
    //     let priceerror=''
    //     // if(!this.state.productPrice){
    //     //     priceerror="Give Valid price"
    //     //     this.setState({priceError:priceerror})
    //     // }
    //      if(isNaN(this.state.productPrice)){
    //         priceerror="price must be a number"
    //         this.setState({priceError:priceerror})
    //     }else{
    //         this.setState({priceError:""})
    //     }
    // }
    // checkQuantity=()=>{
    //     let quantityerror=''
    //     if(this.state.productQuantity(Number)){
    //         quantityerror="Add Quantity"
    //         this.setState({quantityError:quantityerror})
    //     }else{
    //         this.setState({quantityError:""})
    //     }
    // }
    checkCategory=()=>{
        let categoryerror=''
        if(!this.state.productCategory===''){
            categoryerror="Add category"
            this.setState({categoryError:categoryerror})
        }else{
            this.setState({categoryError:""})
        }
    }
    checkStatus=()=>{
        let statuserror=''
        if(!this.state.productStatus===''){
            statuserror="Add Quantity"
            this.setState({statusError:statuserror})
        }else{
            this.setState({statusError:""})
        }
    }
    checkImage=()=>{
        let imageerror=''
        if(this.state.productImage){
            imageerror="Add Image"
            this.setState({imageError:imageerror})
        }else{
            this.setState({imageError:""})
        }
    }

    addProduct=async()=>{
        let productRequest={
            "id":this.state.productId,
            "image":this.state.productImage,
            "name":this.state.productName,
            "price":this.state.productPrice,
            "quantity":this.state.productQuantity,
            "category":this.state.productCategory,
            "status":this.state.productStatus
            
        }
        const data=await Axios.get('http://localhost:3000/allProducts?id='+this.state.productId);
        if(data.data.length!==0){
            if(this.state.productId===data.data[0].id){
               alert("ProductId must be unique")
            }
        }
       else if(this.state.nameError===''&&this.state.categoryError===''&&
                            this.state.statusError===''&&this.state.imageError===''){
                                            Axios.post("http://localhost:3000/allProducts",productRequest)
                                            .then(response=>{
                                                console.log(response)
                                                this.props.history.push('/products')
                                            },error=>{
                                                console.log(error)
                                            })
                                        }else{
                                            alert('Add Valid Products')
                                        }
        
    }
   
    render() { 
        return ( 
            <div >
              <Navbar></Navbar>
                <form >
                    <fieldset   >
                    <center style={{padding:'10px'}}>
                <h2 >Add Product</h2>
                <input type="text" placeholder="Product Id" onChange={this.getId} style={{width:'60%'}} ></input>
                {this.state.idError}<br></br>
                <input type="text" placeholder="Product Name" onChange={this.getName} style={{width:'60%'}}></input>
                {this.state.nameError}<br></br>
                <input type="number" placeholder="Price" onChange={this.getPrice} min="1" style={{margin:'12px 10px', width:'28%'}} ></input>
                {this.state.priceError}
                <input type="number" placeholder="Quantity" onChange={this.getQuantity} min="1" style={{width:'30%'}}></input>
               <br></br>
                <input type="text" placeholder="Category" onChange={this.getCategory} style={{width:'26%'}} ></input>
                {this.state.categoryError}
                <input type="text"placeholder="Status"onChange={this.getStatus} style={{margin:'12px 10px', width:'30%'}} />
                {this.state.statusError}<br></br>
                <input type="file" onChange={this.getImage} multiple accept='image/*'></input>
                {this.state.imageError}
                 {/* <select name="category" value="category" onChange={this.getCategory} >
                     <option value="Mobiles">Mobiles</option>
                     <option value="Electronics">Electronics</option>
                     <option value="Clothes">Clothes</option></select> */}
                
                <button type="submit"onClick={this.addProduct} >Add</button>
                </center>
                    </fieldset>
                </form>
               
            </div>
         );
    }
}
 
export default AddProduct;