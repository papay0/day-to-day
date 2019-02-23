import React, { Component } from "react";

import Home from "../Home/Home";

export default class LoggedIn extends Component {
  render() {
    const { displayName } = this.props;

    return (
      <div>
        <Home displayName={displayName} />
      </div>
    );
  }
}
