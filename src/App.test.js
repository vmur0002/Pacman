import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import Header from "./components/UI/Header/Header";
import Grid from "./containers/Grid/Grid";
import Footer from "./components/UI/Footer/Footer";

Enzyme.configure({ adapter: new Adapter() });

describe("<App />", () => {
  it("should render all componenets without crash", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Grid)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
  });
});
