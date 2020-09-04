import React from 'react';
import './content.css'
import axios from 'axios';
import ProductDetail from './productDetail';


import Pagination from '../pagination/pagination';


class Product extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            products: [],
            productsList: [],
            myid: 0,
            searchValue: '',
            sortvalue:false,
            currentPage:1,
            postPerPage:3
            
        }
        
    }
   

    componentDidMount() {
        if(localStorage.getItem('userLogin')===null){
            this.props.history.push('/')
        }

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
        const indexOfLastProd = this.state.currentPage*this.state.postPerPage;
        const indexOfFirstProd = indexOfLastProd-this.state.postPerPage;
        const currentProd = this.state.products.slice(indexOfFirstProd,indexOfLastProd);
        return currentProd.map(product => {
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
   paginate=(pages)=>{
       this.setState({currentPage:pages})
   } 
    render() {

        return (
            <div>
               
              
               <div>
                    <input  className="searchBar" placeholder="Search by Name or Category" value={this.state.searchValue} onChange={this.getSearch}></input>
                    <button className="add" onClick={this.sortName}>Sort by Price</button>
                   
                    <br></br>
                    </div>

                {this.renderAllProducts()}
                <Pagination prodPerPage={this.state.postPerPage} totalProd={this.state.products.length} paginate={this.paginate}></Pagination>


            </div>
        );
    }
}

export default Product;