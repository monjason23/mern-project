import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import axios from "axios";

class App extends Component {
  state = {
    server: ""
  };

  componentDidMount() {
    this.connectServer();
    console.log("hey");
  }

  connectServer = () => {
    axios.get("/hello").then(res => {
      console.log(res.data);
      this.setState(
        {
          server: res.data.connected
        },
        () => {
          console.log(this.state.server);
        }
      );
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.server}</p>
      </div>
    );
  }
}

export default App;
