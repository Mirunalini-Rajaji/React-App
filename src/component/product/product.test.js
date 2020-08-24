import React from 'react';

import App from '../App'
import { render } from '@testing-library/react';


    it("add",()=>{
        const{asFragment}=render(<App/>)
        expect(asFragment(<App/>)).toHave(<div></div>)
   
    });
