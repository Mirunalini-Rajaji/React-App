import React from 'react';
import ReactDOM from 'react-dom'
import Products from '../Products/product'
import { mount ,configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter as Router} from 'react-router-dom'
// import {  render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
configure({ adapter: new Adapter() })

it('ProductPage renders without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<Router><Products></Products></Router>, div)
})
it("calls sort function", () => {
    const sortName = jest.fn();
    const wrapper = mount(<button onClick={sortName}></button>);
    const button = wrapper.find("button");
    button.simulate("click");
    expect(sortName).toHaveBeenCalledTimes(1);
  });
