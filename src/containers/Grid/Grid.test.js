import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Grid from "./Grid";
import * as helpers from "./helpers/helpers";

Enzyme.configure({ adapter: new Adapter() });

describe("<Grid />", () => {
  it("should show user loading text when content is loading", () => {
    const wrapper = mount(<Grid />);
    wrapper.setState({ loading: true });
    expect(wrapper.find("p").text()).toBe("Loading...");
    wrapper.unmount();
  });

  it("should put the Pacman on the grid in positon X: 2, Y: 2 and facing EAST.", () => {
    // Spy on component and helpers methods
    const componentDidMountSpy = jest.spyOn(
      Grid.prototype,
      "componentDidMount"
    );
    const placeSpy = jest.spyOn(helpers, "place");
    const renderSurfaceSpy = jest.spyOn(helpers, "renderSurface");

    // Full mount <Grid />
    const wrapper = mount(<Grid />);

    expect(Grid.prototype.componentDidMount).toHaveBeenCalledTimes(1);
    expect(placeSpy).toHaveBeenCalledTimes(1);
    expect(renderSurfaceSpy).toHaveBeenCalledTimes(1);

    const place = wrapper.state().pacman.place;
    expect(place.x).toBe(2);
    expect(place.y).toBe(2);
    expect(place.f).toBe("EAST");

    componentDidMountSpy.mockRestore();
    placeSpy.mockRestore();
    renderSurfaceSpy.mockRestore();
    wrapper.unmount();
  });
});

describe("Code challenge example test inputs", () => {
  it("should take test case a as input and match with output", () => {
    // Spy on component and helpers methods
    const placeSpy = jest.spyOn(helpers, "place");
    const moveSpy = jest.spyOn(helpers, "move");
    const reportSpy = jest.spyOn(helpers, "report");

    // Mount component and check initial method calls
    const wrapper = mount(<Grid />);
    expect(placeSpy).toHaveBeenCalledTimes(1);
    expect(moveSpy).toHaveBeenCalledTimes(0);
    expect(reportSpy).toHaveBeenCalledTimes(0);

    // Check initial placement of pacman
    const place = wrapper.state().pacman.place;
    expect(place.x).toBe(2);
    expect(place.y).toBe(2);
    expect(place.f).toBe("EAST");

    // Running inputs of test case a
    const pacman = helpers.place(0, 0, "NORTH");
    const movedPacman = helpers.move(pacman);
    const report = helpers.report(movedPacman);

    expect(placeSpy).toHaveBeenCalledTimes(2);
    expect(moveSpy).toHaveBeenCalledTimes(1);
    expect(reportSpy).toHaveBeenCalledTimes(1);

    expect(report).toEqual([0, 1, "NORTH"]);

    // Restoring mock functions
    placeSpy.mockRestore();
    moveSpy.mockRestore();
    reportSpy.mockRestore();
    wrapper.unmount();
  });

  it("should take test case b as input and match with output", () => {
    // Spy on component and helpers methods
    const placeSpy = jest.spyOn(helpers, "place");
    const leftSpy = jest.spyOn(helpers, "left");
    const reportSpy = jest.spyOn(helpers, "report");

    // Mount component and check initial method calls
    const wrapper = mount(<Grid />);
    expect(placeSpy).toHaveBeenCalledTimes(1);
    expect(leftSpy).toHaveBeenCalledTimes(0);
    expect(reportSpy).toHaveBeenCalledTimes(0);

    // Check initial placement of pacman
    const place = wrapper.state().pacman.place;
    expect(place.x).toBe(2);
    expect(place.y).toBe(2);
    expect(place.f).toBe("EAST");

    // Running inputs of test case a
    const pacman = helpers.place(0, 0, "NORTH");
    const pacmanWithNewDirection = helpers.left(pacman);
    const report = helpers.report(pacmanWithNewDirection);

    expect(placeSpy).toHaveBeenCalledTimes(2);
    expect(leftSpy).toHaveBeenCalledTimes(1);
    expect(reportSpy).toHaveBeenCalledTimes(1);

    expect(report).toEqual([0, 0, "WEST"]);

    // Restoring mock functions
    placeSpy.mockRestore();
    leftSpy.mockRestore();
    reportSpy.mockRestore();
    wrapper.unmount();
  });

  it("should take test case c as input and match with output", () => {
    // Spy on component and helpers methods
    const placeSpy = jest.spyOn(helpers, "place");
    const moveSpy = jest.spyOn(helpers, "move");
    const leftSpy = jest.spyOn(helpers, "left");
    const reportSpy = jest.spyOn(helpers, "report");

    // Mount component and check initial method calls
    const wrapper = mount(<Grid />);
    expect(placeSpy).toHaveBeenCalledTimes(1);
    expect(moveSpy).toHaveBeenCalledTimes(0);
    expect(leftSpy).toHaveBeenCalledTimes(0);
    expect(reportSpy).toHaveBeenCalledTimes(0);

    // Check initial placement of pacman
    const place = wrapper.state().pacman.place;
    expect(place.x).toBe(2);
    expect(place.y).toBe(2);
    expect(place.f).toBe("EAST");

    // Running inputs of test case a
    const pacman = helpers.place(1, 2, "EAST");
    const movedPacman1 = helpers.move(pacman);
    const movedPacman2 = helpers.move(movedPacman1);
    const pacmanWithNewDirection = helpers.left(movedPacman2);
    const movedPacman3 = helpers.move(pacmanWithNewDirection);
    const report = helpers.report(movedPacman3);

    expect(placeSpy).toHaveBeenCalledTimes(2);
    expect(moveSpy).toHaveBeenCalledTimes(3);
    expect(leftSpy).toHaveBeenCalledTimes(1);
    expect(reportSpy).toHaveBeenCalledTimes(1);

    expect(report).toEqual([3, 3, "NORTH"]);

    // Restoring mock functions
    placeSpy.mockRestore();
    leftSpy.mockRestore();
    reportSpy.mockRestore();
    wrapper.unmount();
  });
});
