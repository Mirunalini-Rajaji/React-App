import React from 'react';
import Chart from "react-google-charts";
import axios from 'axios';


 
var unique = [];

class Dashboard extends React.Component {
 
    state = {
        products: [],
        chart1: [["category", "quantity"]],
        chart2:[["name","quantity"]],
        selectedCategory: '',
        unique: [],
        filter: [],
        copy: [],
        final: []
    }
 
    componentDidMount() {
        if(localStorage.getItem('userLogin')===null){
            this.props.history.push('/')
        }
        this.getProducts();
    }
 
    getProducts() {
        axios.get('http://localhost:3000/allProducts')
            .then((response) => {
                console.log(response)
                console.log(response.data)
                this.setState({ products: response.data }, () => {
                    var myArray = [];
                    this.state.products.map(p => {
                       return myArray.push(p.category)
                    })
                    unique = myArray.filter((v, i, a) => a.indexOf(v) === i);
                    console.log(unique)
                    this.setState({ unique: unique })
                    var products = []
                    unique.map(c => {
                        // console.log("loop" + c)
                        products = this.state.products.filter(p =>
                            p.category === c)
                        console.log(products)
                        var sum1 = 0
                        var sum = products.map(p => {
                             return sum1 = parseInt(sum1) + parseInt(p.quantity)
                        })
                        console.log(sum1)
                        this.state.chart1.push([c, sum1])
                    })
                //         var name=[]
                //         unique.map(c => {
                //             console.log("loop" + c)
                //             name = this.state.products.filter(p =>
                //                 p.category === c)
                //             console.log(name)
                //            var pname=''
                //           var quant=0
                //             name.map(p => {
                //                  return ((pname= p.name ) && (quant=parseInt(p.quantity)))
                //             })
                           
                //             this.state.chart2.push([pname,quant])
                //     })
                //     console.log(this.state.chart2)
                //     this.setState({ copy1: this.state.chart2 })
                })
            }, (error) => {
 
                console.log(error)
 
            })
 
    }
    onChangeHandler(event) {
        event.preventDefault()
        var value = event.target.value
        if (value === "All") {
            this.setState({ chart2: this.state.chart2 })
            console.log(this.state.chart2)
        }
        else {
            console.log(event.target.value)
        //     var result = this.state.chart2.filter(p => {if(p[0] === value){
        //         return this.state.chart2.push([p.name,parseInt(p.quantity)])
        //     }
        // }
        // )
        var result =  axios.get('http://localhost:3000/allProducts?category='+value).then (response=>{
            console.log(response.data)
            return this.state.chart2.push([response.data.name])
           

        })
        console.log(this.state.result)
            // console.log(this.state.chart2)
            // var final = [["name", "quantity"]]
            // final.push(result[0])
            // console.log(final)
            // this.setState({ chart2: final })
        }
 
    }
    render() {
        return (
            <div>
              
               
                    <div>
                        {/* <label>Select Category:</label>
                        <select name="category" style={{ width: "200px",marginTop:'20px' }} onChange={this.onChangeHandler.bind(this)}>
                            <option value="All">All</option>
                            {this.state.unique.map(o => (
                                <option value={o}>{o}</option>
                            ))}
                        </select>
                        <br /><br /> */}
                        <div style={{ padding: '70px', height: '100%', marginTop: '0px', alignContent: 'center' }} >
                        <Chart
                            width="90%"
                            height={'400px'}
                            chartType="PieChart"
                            data={this.state.chart1}
                            options={{
                                title: 'Top Categories', is3D: true,
                            }}
                            rootProps={{ 'data-testid': '1' }}>
                        </Chart>
                        {/* <Chart
                                chartType="Bar"
                                options={pieOptions}
                                data={this.state.chart2}
                                width="80%"
                                height="400px"
                                legendToggle
                                style={{ padding: '0px', marginTop: '40px' }}
                            /> */}
                           
 
                        </div>
                    </div>
              
 
            </div>
        );
    }
}
 
export default Dashboard;