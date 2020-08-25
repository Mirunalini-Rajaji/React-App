import React from 'react';
import ReactDOM from 'react-dom'
import Signin from '../signin/signIn'
import { mount ,configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter as Router} from 'react-router-dom'
import {  render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
configure({ adapter: new Adapter() })


it('Signin renders without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<Router><Signin></Signin></Router>, div)
})


it('check if h1 renders correctly', ()=>{
    const {getByTestId} = render(<Router><Signin></Signin></Router>)
    expect(getByTestId('h2')).toHaveTextContent('SignIn')
})
it(" check firstName", () => {
    const wrapper = mount(<input type="text" placeholder="First Name" />);
    const input = wrapper.find("input");
    expect("input").toHaveLength(5)
    expect(input.prop("type")).toEqual("text");
    expect(input.prop("placeholder")).toEqual("First Name");
  });
  it(" check lastname", () => {
    const wrapper = mount(<input type="text" placeholder="Last Name" />);
    const input = wrapper.find("input");
    expect("input").toHaveLength(5)
    expect(input.prop("type")).toEqual("text");
    expect(input.prop("placeholder")).toEqual("Last Name");
  });
it(" check email", () => {
    const wrapper = mount(<input type="text" placeholder="Email Address" />);
    const input = wrapper.find("input");
    // expect("input").toHaveValue('@')
    expect(input.prop("type")).toEqual("text");
    expect(input.prop("placeholder")).toEqual("Email Address");
  });
it(" check password", () => {
    const wrapper = mount(<input type="password" placeholder="Password" />);
    const input = wrapper.find("input");
    expect(input.prop("type")).toEqual("password");
    expect(input.prop("placeholder")).toEqual("Password");
});



