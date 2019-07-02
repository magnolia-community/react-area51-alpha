import React from "react";
import logo from "./logo.svg";
import "./App.css";

//Area51
import axios from "axios";
import { Area51Context } from "magnolia-react-area51";

import { dlog, inPageEditor } from "./app/AppHelpers";

import ENVIRONMENT from "./environments/environment";
import COMPONENTS from "./app/mapping";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
