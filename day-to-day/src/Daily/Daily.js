import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TaskCard from "../PlatformUI/TaskCard";

const styles = {};

class Daily extends Component {
  render() {
    const tasks = [
      { day: "Wednesday 25th February" },
      { day: "Tuesday 24th February" },
      { day: "Monday 23th February" }
    ];
    return tasks.map(task => {
      return (
        <TaskCard day={task.day} key={task.day} />
      );
    });
  }
}

Daily.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Daily);
