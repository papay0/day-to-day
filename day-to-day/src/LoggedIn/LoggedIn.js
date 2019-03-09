import React, { Component } from "react";
import axios from "axios";

import Home from "../Home/Home";

export default class LoggedIn extends Component {
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
      );
  };

  render() {
    const { displayName, email } = this.props;
    this.login(displayName, email);
    return (
      <div>
        <Home displayName={displayName} email={email}/>
      </div>
    );
  }
}
