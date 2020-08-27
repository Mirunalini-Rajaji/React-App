import React from 'react';
import ReactDOM from 'react-dom'
import Login from '../login/login'
import { Link } from "react-router-dom";
import { mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter as Router} from 'react-router-dom'
import {  render } from '@testing-library/react';
import renderer from "react-test-renderer";
import '@testing-library/jest-dom/extend-expect'
configure({ adapter: new Adapter() })


it('login renders without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<Router><Login></Login></Router>, div)
})


it('check if h1 renders in correct way', ()=>{
    const {getByTestId} = render(<Router><Login></Login></Router>)
    expect(getByTestId('h1')).toHaveTextContent('Inventory')
})
it(" check email", () => {
    const wrapper = mount(<input type="text" placeholder="Email Address" />);
    const input = wrapper.find("input");
    expect(input.prop("type")).toEqual("text");
    expect(input.prop("placeholder")).toEqual("Email Address");
  });
it(" check password", () => {
    const wrapper = mount(<input type="password" placeholder="Password" />);
    const input = wrapper.find("input");
    expect(input.prop("type")).toEqual("password");
    expect(input.prop("placeholder")).toEqual("Password");
});
it('check if p renders correctly', ()=>{
    const {getByTestId} = render(<Router><Login></Login></Router>)
    expect(getByTestId('p')).toHaveTextContent('Dont have an account?')
})
it('check link',()=>{
    const link = renderer.create(<Router><Link to="/createaccount"></Link></Router>).toJSON()
    expect(link).toMatchSnapshot()
})


