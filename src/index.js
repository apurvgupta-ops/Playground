import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateProvider } from "./Context/StateProvider";
import reducer, { initialState } from "./Context/reducer";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
