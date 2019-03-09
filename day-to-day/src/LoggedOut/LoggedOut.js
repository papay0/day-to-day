import React, { Component } from "react";
import Button from "@material-ui/core/Button";

export default class LoggedOut extends Component {
  render() {
    const { signInWithGoogle } = this.props;

    return (
      // <div style={{ textAlign: "center", verticalAlign: "middle" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Button
          variant="outlined"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      </div>
    );
  }
}
