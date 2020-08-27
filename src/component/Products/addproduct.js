import React from 'react';
import './content.css'
import Axios from 'axios';
import Header from '../header/header';

class AddProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productImage: '',
            productName: '',
            productPrice: 0,
            productQuantity: 0,
            cty: '',
            iderror: '',
            nameerror: '',
            categoryerror: '',
            imageerror: '',
            allcty: [],
            success:false

        }
    }

    componentWillMount() {
        this.getAllCat()
    }
    getAllCat = () => {
        Axios.get("http://localhost:3000/allcategory").then(response => {
            this.setState({ allcty: response.data })
            console.log(response.data)
        }, error => {
            console.log(error)
        })
    }

    getName = (event) => {
        this.setState({ productName: event.target.value })
        this.checkName()
    }
    getPrice = (event) => {
        this.setState({ productPrice: event.target.value })

    }
    getQuantity = (event) => {
        this.setState({ productQuantity: event.target.value })

    }
    getCategory = (event) => {
        this.setState({ cty: event.target.value })
       
    }

    getImage = (event) => {
        console.log(event.target.value.substr(12))
        this.setState({ productImage: event.target.value.substr(12) })
        this.checkImage()
    }


    checkName = () => {
        let nameerror = ''
        if (this.state.productName.length < 1) {
            nameerror = "*Name must be greater than 2"
            this.setState({ nameError: nameerror })
        } else {
            this.setState({ nameError: "" })
        }
    }


    
    checkImage = () => {
        let imageerror = ''
        if (this.state.productImage) {
            imageerror = "Add Image"
            this.setState({ imageError: imageerror })
        } else {
            this.setState({ imageError: "" })
        }
    }

    addProduct = () => {

        let productRequest = {
           
            "image": this.state.productImage,
            "name": this.state.productName,
            "price": this.state.productPrice,
            "quantity": this.state.productQuantity,
            "category": this.state.cty,


        }

        if (this.state.nameError === '' && this.state.imageError === '') {
            Axios.post("http://localhost:3000/allProducts", productRequest)
                .then(response => {
                    console.log(response)
                    
                }, error => {
                    console.log(error)
                })
                this.setState({success:true})
            // this.props.history.push('/products')
        }

    }
continue=()=>{
    this.props.history.push('/products')
}


    render() {
        if(this.state.success){
            return (
                <div>
                   <Header></Header>
                    <div style={{ textAlign: 'center', paddingTop: '50px'}}>
                        <h3>Product Added Successfully!!</h3>
                        <button type="submit" onClick={this.continue}>Ok</button>
                    </div>
                </div>
            )
        }
        return (
            <div >
                <Header></Header>

                <form >

                    <center style={{ padding: '10px' }}>
                        <h2 >Add Product</h2>

                        <input type="text" placeholder="Product Name" onChange={this.getName} required >

                        </input>
                        <div>{this.state.nameError}</div>
                        <input type="number" placeholder="Price" onChange={this.getPrice} min="1" required ></input>
                        <br></br>
                        <input type="number" placeholder="Quantity" onChange={this.getQuantity} min="1" required ></input>
                        <br></br>
                       
                        <select name="list" id="list" onChange={this.getCategory} required >
                            {this.state.allcty.map(cty => <option key={cty.id} value={cty.category}>
                                {cty.category}
                            </option>)}
                        </select><br></br>
                       

                        <input type="file" onChange={this.getImage} required multiple accept='image/*'></input>

                        <br></br>

                        <button type="submit" onClick={this.addProduct} >Add</button>
                    </center>

                </form>

            </div>
        );
    }
}

export default AddProduct;