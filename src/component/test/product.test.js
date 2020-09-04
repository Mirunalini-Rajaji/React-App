import React from 'react';

import ProductTest from '../Products/producttest'
import { mount ,configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter as Router} from 'react-router-dom'
// import {  render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
configure({ adapter: new Adapter() })

describe("Product Page",()=>{
it("calls sort function", () => {
    const sortName = jest.fn();
    const wrapper = mount(<button onClick={sortName}></button>);
    const button = wrapper.find("button");
    button.simulate("click");
    expect(sortName).toHaveBeenCalledTimes(1);
  });
  it("Api Testing for product display", async function () {
    const response = new ProductTest();
    console.warn(await response.api());
    const data = await response.api();
    expect(data[0].name).toEqual("dresses");
   })
 
})
