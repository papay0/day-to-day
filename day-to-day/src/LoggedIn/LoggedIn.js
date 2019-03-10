import React, { Component } from "react";
import axios from "axios";

import Home from "../Home/Home";

export default class LoggedIn extends Component {
  state = {
    loggedIn: false
  };

  login = (displayName, email) => {
    axios
      .post(
        "https://us-central1-daytoday-app.cloudfunctions.net/API/login",
        {
          email: email,
          displayName: displayName
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(res => {
        this.setState({ loggedIn: true });
      });
  };

  componentDidMount() {
    this.login(this.props.displayName, this.props.email);
  }

  render() {
    const { displayName, email } = this.props;
    const loggedIn = this.state.loggedIn;
    return (
      <div>{loggedIn && <Home displayName={displayName} email={email} />}</div>
    );
  }
}
