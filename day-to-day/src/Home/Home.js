import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import Daily from "../Daily/Daily";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
});

class Home extends Component {

  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Daily" />
            <Tab label="Monthly" />
            <Tab label="6 months" />
            <Tab label="Promo" />
            <Tab label="Standup" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}><Daily/></TabContainer>
          <TabContainer dir={theme.direction}>Monthly</TabContainer>
          <TabContainer dir={theme.direction}>6 Months</TabContainer>
          <TabContainer dir={theme.direction}>Promo</TabContainer>
          <TabContainer dir={theme.direction}>Standup</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Home);
