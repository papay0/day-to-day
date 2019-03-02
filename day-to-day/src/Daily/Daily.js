import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TaskCard from "../PlatformUI/TaskCard";

const styles = {};

class Daily extends Component {
  render() {
    const cards = [
      {
        day: "Wednesday 25th February",
        tasks: [
          {
            type: "task",
            description: "Create Android Driver app",
            done: false,
            id: "abcd",
            parentId: null
          },
          {
            type: "subtask",
            description: "Read about Android architecture",
            done: true,
            id: "yeye",
            parentId: "abcd"
          }
        ]
      }
    ];
    return cards.map(card => {
      return <TaskCard day={card.day} key={card.day} tasks={card.tasks} />;
    });
  }
}

Daily.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Daily);
