import React from 'react';
import './content.css'
import axios from 'axios';
import ProductDetail from './productDetail';
import Navbar from '../header/navbar';


class Product extends React.Component {
  
    constructor(props){
        super(props)
        this.state={
            products:[],
            productsList:[],
            myid:0,
            searchValue:''
        }
        
    }

  componentWillMount(){
     
      this.getAllProducts()
  }

    getAllProducts=()=>{
        axios.get("http://localhost:3000/allProducts").then(response=>{
                console.log(response)
                console.log(response.data)
                this.setState({products: response.data, productsList:response.data})
                console.log(this.state.products.name)
        },error=>{
            console.log(error)
        })
    }

    deleteProductById=(id)=>{
        axios.delete("http://localhost:3000/allProducts/"+ id).then(response=>{
            console.log(response)
            this.getAllProducts()
        },error=>{
            console.log(error)
        })
    }

    editProductById=(id)=>{
        this.setState({myid:id})
        this.props.history.push({
            pathname:'/editproduct',
            state:{myid:id}
        })
    }

    renderAllProducts=()=>{
        return this.state.products.map(product=>{
            return(
                <ProductDetail
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                category={product.category}
                status={product.status}
                deleteId={this.deleteProductById}
                editId={this.editProductById}
                >
                    
                </ProductDetail>
            )
        })
    }
    addProduct=()=>{
        this.props.history.push('/addproduct')
    }

    
    getSearch=(e)=>{
        let searchV = e.target.value
        if(searchV ===''){
            this.getAllProducts()
        }
        this.setState({searchValue: searchV})
        console.log(searchV);
        let searchF = this.state.productsList.filter(f=>{
                                return( f.name.toLowerCase().match(searchV.toLowerCase().trim())||
                                f.category.toLowerCase().match(searchV.toLowerCase().trim()))
                               
                            })
        console.log(searchF);    
        this.setState({products: searchF})                

    }
    render() { 
       
        return ( 
            <div>
                <Navbar></Navbar>
                
                
                <center>
                <input type="text" placeholder="Search " value={this.state.searchValue} onChange={this.getSearch}></input>
                
                    <button className="add" onClick={this.addProduct}>Add Product</button>
                    <br></br>
                    </center>
                    
                            {this.renderAllProducts()}
                       
                            
               
            </div>
         );
    }
}
 
export default Product;