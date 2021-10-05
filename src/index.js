import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import App from "./srcx/App";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";

console.log(process.env);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="container my-3">
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
