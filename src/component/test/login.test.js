import React from 'react';
import ReactDOM from 'react-dom'
import Login from '../login/login'
import LoginTest from '../login/logintest'
import { Link } from "react-router-dom";
import { mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MemoryRouter as Router} from 'react-router-dom'
import {  render } from '@testing-library/react';
import renderer from "react-test-renderer";
import '@testing-library/jest-dom/extend-expect'
configure({ adapter: new Adapter() })

describe("login",()=>{
    
it('login renders without crashing', ()=>{
    const div = document.createElement('div')
    ReactDOM.render(<Router><Login></Login></Router>, div)
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
it('check if account text renders correctly', ()=>{
    const {getByTestId} = render(<Router><Login></Login></Router>)
    expect(getByTestId('p')).toHaveTextContent('Dont have an account?')
})
it('check link',()=>{
    const link = renderer.create(<Router><Link to="/createaccount"></Link></Router>).toJSON()
    expect(link).toMatchSnapshot()
})
it("Api Testing for matching password", async function () {
    const response = new LoginTest();
    console.warn(await response.api());
    const data = await response.api();
    expect(data[0].pwd).toEqual("adc");
   })

})

