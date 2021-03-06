import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import './fonts/IRAN-Sans-Regular.ttf'

ReactDOM.render(
  <UserContextProvider>
    <Router>
      <App />
    </Router>
  </UserContextProvider>,
  document.getElementById("root")
);
