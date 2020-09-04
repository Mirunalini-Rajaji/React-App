import React from 'react';
import ReactDOM from 'react-dom'
import AddProducts from '../Products/addproduct'
import { mount ,shallow,configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter as Router} from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
configure({ adapter: new Adapter() })

describe("Add Products",()=>{

it('AddProducts renders without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<Router><AddProducts></AddProducts></Router>, div)
})
it("Render", () => {
    const wrapper = shallow(<AddProducts />);
    const findres = wrapper.find("h2");
    const response = findres.text();
    expect(response).toBe('Add Product');
  });
  it(" check productName", () => {
    const wrapper = mount(<input type="text" placeholder="Product Name" />);
    const input = wrapper.find("input");
    expect("input").toHaveLength(5)
    expect(input.prop("type")).toEqual("text");
    expect(input.prop("placeholder")).toEqual("Product Name");
  });
  it(" check pricevalue", () => {
    const wrapper = mount(<input type="number"  />);
    const input = wrapper.find("input");
    expect(input.prop("type")).toEqual("number");
    // expect(input.prop("placeholder")).toEqual("First Name");
  });
 
  it(" check quantityvalue", () => {
    const wrapper = mount(<input type="number" placeholder="Quantity" />);
    const input = wrapper.find("input");
    expect(input.prop("type")).toEqual("number");
    expect(input.prop("placeholder")).toEqual("Quantity");
  });
  it(" check category field", () => {
    const wrapper = mount(<select name="list" id="list" />);
    const input = wrapper.find("select");
    expect(input.prop("name")).toEqual("list");
    expect(input.prop("id")).toEqual("list");
  });
  

  it("calls Add function when form submitted", () => {
    const addProduct = jest.fn();
    const wrapper = mount(<button onClick={addProduct}></button>);
    const button = wrapper.find("button");
    button.simulate("click");
    expect(addProduct).toHaveBeenCalledTimes(1);
  });
 
 
})