import React from 'react';
import './content.css'
import Axios from 'axios'

class EditProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            image: '',
            name: '',
            price: 0,
            quantity: 0,
            category: '',
            status: '',
            nameerror: '',
            buttonStatus: true,
            success:false,
            updateerror:''
        }
    }

    componentWillMount() {
        if(localStorage.getItem('userLogin')===null){
            this.props.history.push('/')
        }
        if (this.props.location.state !== undefined) {
            Axios.get("http://localhost:3000/allProducts/" + this.props.location.state.myid).then(response => {
                console.log(response)
                this.setState({
                    id: response.data.id,
                    image: response.data.image,
                    name: response.data.name,
                    price: response.data.price,
                    quantity: response.data.quantity,
                    category: response.data.category,

                })
            }, error => {
                console.log(error)
            })
        }
    }


    getName = (event) => {
        this.setState({ name: event.target.value ,buttonStatus:false})
        this.checkName()
    }
    getPrice = (event) => {
        this.setState({ price: event.target.value ,buttonStatus:false})

    }
    getQuantity = (event) => {
        this.setState({ quantity: event.target.value ,buttonStatus:false})

    }
    getCategory = (event) => {
        this.setState({ category: event.target.value,buttonStatus:false })
    }

    checkName = () => {
        let nameerror = ''

        if (this.state.name.length < 2) {
            nameerror = "* Name must be greater than 2"
            this.setState({ nameError: nameerror })
        } else {
            this.setState({ nameError: "" })
        }
    }

    editProduct = async() => {

        let productRequest = {
            "id": this.state.id,
            "image": this.state.image,
            "name": this.state.name,
            "price": this.state.price,
            "quantity": this.state.quantity,
            "category": this.state.category

        }
        const data = await Axios.get('http://localhost:3000/allProducts?id=' + this.state.id);
        
        if (data.data.length !== 0) {
           
            if (this.state.name === data.data[0].name && this.state.price===data.data[0].price
                && this.state.quantity===data.data[0].quantity && this.state.category===data.data[0].category) {
               
            this.setState({buttonStatus:true})
           
            }
           
        } 
      
           
         if(this.state.buttonStatus===false){
            
            Axios.put("http://localhost:3000/allProducts/" + this.state.id, productRequest)
            .then(response => {
                console.log(response)
               
               this.setState({success:true})
            }, error => {
                console.log(error)
            })
        }




    }
    goBack = () => {
        this.props.history.push('/products')
    }
    render() {
        if(this.state.success){
            return (
                <div>
                   
                    <div style={{ textAlign: 'center', paddingTop: '50px'}}>
                        <h3>Product Updated Successfully!!</h3>
                        <h4>Click Ok to Continue</h4>
                        <button type="submit" onClick={this.goBack}>Ok</button>
                    </div>
                </div>
            )
        }
        if (this.props.location.state === undefined) {
            return (
                <div>
                  
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <h3>Product Not Available!!</h3>
                        <button type="submit" onClick={this.goBack}>Go Back</button>
                    </div>
                </div>
            )
        }
        return (
            <div >
               
                <form >
                   
                    <center style={{ padding: '20px' }}>
                        <h2>Update Product</h2>
                        <div className="updateRow">
                            <div className="col-25">
                                <label >Product Name </label>
                            </div>
                            <div className="col-75">
                        <input type="text" value={this.state.name} onChange={this.getName} required style={{width:'70%'}}></input>
                        </div>
                        </div>
                        <div className="error">{this.state.updateError}</div>
                        <div className="label">
                            <div className="col-25">
                            <label >Price </label>
                            </div>
                            <div className="col-75">
                            <input type="number" value={this.state.price} onChange={this.getPrice} required min="1" style={{width:'70%'}}  ></input>
                            </div>
                        </div>
                        <div className="label">
                            <div className="col-25">
                            <label >Quantity </label>
                            </div>
                            <div className="col-75">
                            <input type="number" value={this.state.quantity} onChange={this.getQuantity} required min="1"style={{width:'70%'}} ></input>
                            </div>
                        </div>
                        <div className="label">
                            <div className="col-25">
                            <label >Category </label>
                            </div>
                            <div className="col-75">
                            <input type="text" value={this.state.category} onChange={this.getCategory} readOnly style={{width:'70%'}} ></input>
                            </div>
                        </div>
                        <div className="label">
                            <div className="col-25">

                            </div>
                            <div className="col-75">

                            </div>
                        </div>

                        <button type="submit" onClick={this.editProduct} disabled={this.state.buttonStatus}>Update</button><br></br>
                    </center>
                  
                </form>

            </div>
        );
    }
}

export default EditProduct;