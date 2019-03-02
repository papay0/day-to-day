import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TasksCard from "../PlatformUI/TasksCard";

const styles = {};

class Daily extends Component {
  state = {
    cards: [
      {
        day: "Wednesday 25th February",
        tasks: [
          {
            type: "task",
            description: "Create Android Driver app",
            done: false,
            id: "abcd",
            parentId: null,
            children: [
              {
                type: "subtask",
                description: "Read about Android architecture",
                done: true,
                id: "yeye",
                parentId: "abcd"
              },
              {
                type: "subtask",
                description: "Read about Kotlin",
                done: true,
                id: "yeyesfd",
                parentId: "abcd"
              },
              {
                type: "subtask",
                description: "Install IntelliJ",
                done: false,
                id: "fdssfd",
                parentId: "abcd"
              }
            ]
          },
          {
            type: "task",
            description: "Known issues",
            done: false,
            id: "iiuh",
            parentId: null,
            children: [
              {
                type: "subtask",
                description: "Css subtask not well right aligned",
                done: false,
                id: "lkjlkj",
                parentId: "iiuh"
              }
            ]
          },
          {
            type: "task",
            description: "Hi",
            done: false,
            id: "iiuhfssdfsdfsdf",
            parentId: null,
            children: []
          }
        ]
      }
    ]
  };

  render() {
    return this.state.cards.map(card => {
      return <TasksCard day={card.day} key={card.day} tasks={card.tasks} />;
    });
  }
}

Daily.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Daily);
