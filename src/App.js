import React from 'react';

import Router from "./component/RootComponent";
import Header from './component/header/header';

class App extends React.Component {



    render() {
        return (
            <div>
               <Header></Header>
               <Router></Router>
            </div>
        )
    }

}


export default App