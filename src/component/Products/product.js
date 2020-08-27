import React from 'react';
import './content.css'
import axios from 'axios';
import ProductDetail from './productDetail';

import Header from '../header/header';


class Product extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            products: [],
            productsList: [],
            myid: 0,
            searchValue: '',
            sortvalue:false
            
        }
        
    }
   

    componentWillMount() {

        this.getAllProducts()
        
    }
   

    getAllProducts = () => {
        axios.get("http://localhost:3000/allProducts").then(response => {

            this.setState({ products: response.data, productsList: response.data })

        }, error => {
            console.log(error)
        })
    }

    deleteProductById = (id) => {
        axios.delete("http://localhost:3000/allProducts/" + id).then(response => {

            this.getAllProducts()
        }, error => {
            console.log(error)
        })
    }

    editProductById = (id) => {
        this.setState({ myid: id })
        console.log("edit")
        this.props.history.push({
            pathname: '/editproduct',
            state: { myid: id }
        })
    }

    renderAllProducts = () => {
        
        return this.state.products.map(product => {
            return (
                <ProductDetail
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    quantity={product.quantity}
                    category={product.category}

                    deleteId={this.deleteProductById}
                    editId={this.editProductById}
                >

                </ProductDetail>
            )
        })
    }
   
    getSearch = (e) => {
        let searchV = e.target.value
        if (searchV === '') {
            this.getAllProducts()
        }
        this.setState({ searchValue: searchV })
        console.log(searchV);
        let searchF = this.state.productsList.filter(f => {
            return (f.name.toLowerCase().match(searchV.toLowerCase().trim()) ||
                f.category.toLowerCase().match(searchV.toLowerCase().trim()))

        })
        console.log(searchF);
        this.setState({ products: searchF })
        this.setState({sortvalue:false})
    }
   
    sortName=()=>{
        const newlist=this.state.products;
        if(this.state.sortvalue===false){
            newlist.sort((a,b)=>
                a.price - b.price)            
            this.setState({products:newlist})
            return this.setState({sortvalue:true})
        }
        if(this.state.sortvalue===true){
            newlist.sort((a,b)=>
            b.price - a.price)            
        this.setState({products:newlist})
            return this.setState({sortvalue:false})
        }
    }
    
    render() {

        return (
            <div>
                <Header></Header>
              
               <div>
                    <input type="text" className="searchBar" placeholder="Search by Name or Category" value={this.state.searchValue} onChange={this.getSearch}></input>
                    <button className="add" onClick={this.sortName}>Sort by Price</button>
                   
                    <br></br>
                    </div>

                {this.renderAllProducts()}



            </div>
        );
    }
}

export default Product;