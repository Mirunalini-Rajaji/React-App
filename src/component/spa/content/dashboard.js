import React from 'react';
import Chart from "react-google-charts";
import axios from 'axios';
import './content.css'

import Navbar from '../header/navbar';

class Dashboard extends React.Component {
    constructor(props){
        super(props)
        this.state={
            products:[],
            chatData:[
                ["productName","quantity"]
            ],
            barData:[
                ["Category","quantity"]
            ]

        }
    }
    componentWillMount(){
     this.getAllProducts()
    }
  
      getAllProducts=()=>{
          axios.get("http://localhost:3000/allProducts").then(response=>{
                
                  this.setState({products: response.data})
                  
                  this.state.products.map(pr=>{
                   return this.state.chatData.push([pr.name,parseInt(pr.quantity)])&&
                   this.state.barData.push([pr.category,parseInt(pr.quantity)]);
                  })
          },error=>{
              console.log(error)
          })
      }
     
    render() { 
        return ( 
            <div>
              <Navbar></Navbar>
                
                <center>
					<Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    data={this.state.chatData}
                    options={{
                        title: 'Product Details', is3D: true,
                    }}
                     rootProps={{ 'data-testid': '1' }}>
                    </Chart>
                    <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="Histogram"
                    data={this.state.barData}
                    options={{
                        title: 'Top Category',
                        legend:{position:'none'},
                        colors:['pink'],
                        histogram:{lastBucketPercentile:5},
                        vAxis:{scaleType:'mirrorLog'},
                    }}
                     rootProps={{ 'data-testid': '3' }}>
                    </Chart>
				</center>
            </div>
         );
    }
}
 
export default Dashboard;