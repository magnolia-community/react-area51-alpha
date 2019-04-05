import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import renderer from 'react-test-renderer';


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
});

/**
 * Simple Snapshot tet for the entire app - based on the contents of the sampleData directory.
 */
it('App renders correctly with sampleData', () => {
  const tree = renderer
    .create(<BrowserRouter><App useSampleData={true} /></BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
