import React from 'react';
import './content.css'
import axios from 'axios';
import ProductDetail from './productDetail';

import Header from '../header/header';


class Product extends React.Component {

    constructor(props) {
        super(props)
        // this.sortName = this.sortName.bind(this)
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
        // this.sortName()
    }
    // sortName=()=>{
    //     console.log("inside sort")
    //     let Request={
    //         "price" : this.state.price
    //     }
    //     axios.get("http://localhost:3000/allProducts",Request)
    //     .then((response)=>{response.data.sort((a,b)=>a.price-b.price);
    //     this.setState({data:response})})
    // }

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
    // addProduct = () => {
    //     this.props.history.push('/addproduct')
    // }


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

    }
    // sortName(event){
    //     const {products} = this.state;
    //     let newlist = products.reverse();
    //     this.setState({products:newlist.sort((a,b)=>a.name<b.name)})
    //     console.log(products)
    // }
    sortName=()=>{
        const newlist=this.state.products;
        if(this.state.sortvalue===false){
            newlist.sort((a,b)=>
                a.price - b.price)            
            this.setState({products:newlist})
            return this.setState({sortvalue:true})
        }
        if(this.state.sortvalue===true){
            this.getAllProducts()
            return this.setState({sortvalue:false})
        }
    }
    
    render() {

        return (
            <div>
                <Header></Header>
               
                {/* <select>
                    <option defaultValue="sort">Sort</option>
                    <option value="low to high" onChange={this.sortName}>Low o High</option>
                        </select> */}

               <div>
                    <input type="text" className="searchBar" placeholder="Search by Name or Category" value={this.state.searchValue} onChange={this.getSearch}></input>
                    <button className="add" onClick={this.sortName}>Sort by Price</button>
                    {/* <button className="add" onClick={this.addProduct}>Add Product</button> */}
                    <br></br>
                    </div>

                {this.renderAllProducts()}



            </div>
        );
    }
}

export default Product;