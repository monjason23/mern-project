import React, { Component } from "react";

import axios from "axios";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock
} from "react-bootstrap";

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class App extends Component {
  state = {
    username: "",
    password: ""
  };

  connectServer = () => {
    axios.get("/").then(res => {
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

  handleSubmit = e => {
    e.preventDefault();
    axios.post("/login", this.state).then(result => console.log(result.data));
  };

  handleLogout = e => {
    e.preventDefault();
    axios
      .get("/logout")
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  handleOnChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  handleOnChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    return (
      <div className="App" style={{ padding: "16px" }}>
        <div>
          <form onSubmit={this.handleSubmit}>
            <FieldGroup
              id="username"
              type="text"
              label="Username"
              placeholder="Username"
              onChange={this.handleOnChangeUsername}
            />
            <FieldGroup
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              onChange={this.handleOnChangePassword}
            />
            <Button type="submit">Login</Button>
            <Button type="button" onClick={this.handleLogout}>
              Logout
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
