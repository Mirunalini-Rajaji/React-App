import React from 'react';
import Axios from 'axios';



class Category extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            nameerror: '',
            buttonStatus: true,
            caterror:''
        }
    }
    getName = (event) => {
        this.setState({ name: event.target.value })
        this.checkName()
    }
    checkName = () => {
        let nameerror = ''
        if (this.state.name.length < 3) {
            nameerror = "Category must be greater than 3"
            this.setState({ nameError: nameerror, buttonStatus: true })
        } else {
            this.setState({ nameError: '', buttonStatus: false })
        }
    }

    addCat = async () => {
        let cat = {
            "category": this.state.name
        }
        const data = await Axios.get('http://localhost:3000/allcategory?category=' + this.state.name);
        console.log(this.state.name)
        if (data.data.length !== 0) {
            console.log(data.data[0].name)
            if (this.state.name.toLowerCase() === data.data[0].category.toLowerCase()) {
                // alert("category is already added")
                let caterror="* category is already added"
                this.setState({catError:caterror,buttonStatus:true})
            }
        } else if (this.state.nameerror === '') {
            Axios.post('http://localhost:3000/allcategory', cat).then(response => {
                this.props.history.push('/products')
            }, error => {
                console.log(error)
            })
        }
    }
    render() {
        return (
            <div>
               

                <form>
                    <center style={{ padding: '20px' }}>
                       
                        <h2>Add Category</h2>
                        <div className="error">{this.state.catError}</div>
                        <input type="text" placeholder="Category" onChange={this.getName}></input>
                        <div>{this.state.nameError}</div>
                        <button type="submit" onClick={this.addCat} disabled={this.state.buttonStatus}>Add</button>
                        
                    </center>
                </form>

            </div>
        );
    }
}

export default Category;