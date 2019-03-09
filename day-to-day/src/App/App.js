import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebaseConfig";
import "./App.css";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import LoggedIn from "../LoggedIn/LoggedIn";
import LoggedOut from "../LoggedOut/LoggedOut";
import { BrowserView, MobileView } from "react-device-detect";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class App extends Component {
  render() {
    const { user, signOut, signInWithGoogle, classes } = this.props;

    return (
      <div className="App">
        <BrowserView>
          <AppBar position="static" style={{ textAlign: "center" }}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                {user && user.displayName + " - "}
                Day To Day
              </Typography>
              {user && (
                <Button color="inherit" onClick={signOut}>
                  Logout
                </Button>
              )}
            </Toolbar>
          </AppBar>
          {user ? (
            <LoggedIn displayName={user.displayName} email={user.email} signOut={signOut} />
          ) : (
            <LoggedOut signInWithGoogle={signInWithGoogle} />
          )}
        </BrowserView>
        <MobileView>
          <iframe
            title="Not Mobile Friendly"
            src="https://giphy.com/embed/OSuaE6AknuRc7syZXp"
            width="480"
            height="360"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          />
        </MobileView>
      </div>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(withStyles(styles)(App));
