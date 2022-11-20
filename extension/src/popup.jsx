import React, { Component } from "react";
import ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(document.getElementById("root"));

class Popup extends Component {
  render() {
    return (
      <div>
        <div>Hello world</div>
        <div>Hello</div>
      </div>
    );
  }
}
root.render(<Popup />);
