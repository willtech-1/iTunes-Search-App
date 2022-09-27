// import renderer
import renderer from "react-test-renderer";
import App from "./App";

// describe the test
describe("spanshot testing", () => {
  // test module to create the test
  test("snapshot test for app component", () => {
    const component = renderer.create(<App />).toJSON();
    // match the snapshot
    expect(component).toMatchSnapshot();
  });
});
