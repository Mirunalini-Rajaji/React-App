import React from 'react';
import './content.css'
class ProductDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    deleteProduct = () => {
        this.props.deleteId(this.props.id)
    }

    editProductById = () => {
        this.props.editId(this.props.id)
    }
    render() {
        return (
            <div className="row">
                <div className="column">
                    <div className="card">
                        <img src={"images/" + this.props.image} height="170px" width="170px" alt="profile"></img>
                        <h2>{this.props.name}</h2>
                        <h4>Price : {this.props.price}</h4>
                        <h4>Quantity: {this.props.quantity}</h4>
                        <h4>Category: {this.props.category}</h4>

                        <button className="update" onClick={this.editProductById} >Update</button>
                        <button className="delete" onClick={this.deleteProduct}>Delete</button>
                    </div>
                </div>
            </div>


        );
    }
}

export default ProductDetail;