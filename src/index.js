import React from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";
import RouteSwitch from "./Components/RouteSwitch";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //Enabling strict mode breaks the drag-and-drop functionality of react-beautiful-dnd
  // <React.StrictMode>
  <RouteSwitch />
  // </React.StrictMode>
);
