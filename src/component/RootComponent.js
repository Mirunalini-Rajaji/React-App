import React from 'react';
import Header from "./spa/header/header";
import Content from "./spa/content/Content";

class RootComponent extends React.Component{

    

    render(){
        return (
            <div>
                <Header></Header>
                <Content></Content>
            </div>
        )
    }

}


export default RootComponent