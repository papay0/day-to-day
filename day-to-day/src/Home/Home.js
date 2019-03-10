import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import Daily from "../Daily/Daily";
import Promo from "../Promo/Promo";
import Standup from "../Standup/Standup";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
});

class Home extends Component {
  state = {
    value: parseInt(localStorage.getItem("tabIndex")) || 0
  };

  handleChange = (event, value) => {
    localStorage.setItem("tabIndex", value);
    this.setState({ value });
  };

  handleChangeIndex = index => {
    localStorage.setItem("tabIndex", index);
    this.setState({ value: index });
  };

  render() {
    const { classes, theme, email } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant={window.innerWidth > 1000 ? "fullWidth" : "scrollable"}
            scrollButtons="auto"
          >
            <Tab label="Daily" value={0} />
            <Tab label="Promo" value={1} />
            <Tab label="Standup" value={2} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Daily email={email} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Promo email={email} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Standup email={email} />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Home);
