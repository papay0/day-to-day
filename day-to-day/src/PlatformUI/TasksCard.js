import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import TasksElement from "./TasksElement";

const styles = {};

class TasksCard extends Component {
  state = {
    tasks: this.props.tasks
  };

  everySubtaskIsDone = subtasks => {
    return subtasks.every(subtask => subtask.done);
  };

  updateOrderTasks = tasks => {
    const tasksNotDone = [];
    const tasksDone = [];

    for (let task of tasks) {
      if (task.children.length === 0) {
        if (task.done) {
          tasksDone.push(task);
        } else {
          tasksNotDone.push(task);
        }
        continue;
      }
      if (this.everySubtaskIsDone(task.children)) {
        task.done = true;
        tasksDone.push(task);
      } else {
        task.done = false;
        tasksNotDone.push(task);
      }
    }
    console.log(tasksNotDone.concat(tasksDone));
    return tasksNotDone.concat(tasksDone);
  };

  handleCheckboxClicked = taskId => {
    console.log("Checkbox: ", taskId);
    const tasks = this.state.tasks.slice();

    for (let task of tasks) {
      if (task.id === taskId) {
        task.done = !task.done;
        continue;
      }
      for (let subtask of task.children) {
        if (subtask.id === taskId) {
          subtask.done = !subtask.done;
          continue;
        }
      }
    }
    this.setState({ tasks: this.updateOrderTasks(tasks) });
  };

  render() {
    const { classes, day } = this.props;
    const tasks = this.state.tasks;
    const tasksDone = tasks.filter(task => task.done);
    const tasksNotDone = tasks.filter(task => !task.done);
    return (
      <div>
        <Card
          className={classes.card}
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "15%",
            marginRight: "15%"
          }}
        >
          <CardHeader
            title={day}
            action={
              <Fab
                color="primary"
                size="small"
                aria-label="Add"
                className={classes.fab}
              >
                <AddIcon />
              </Fab>
            }
          />
          <Divider />
          <CardContent>
            <TasksElement tasks={tasksNotDone} handleCheckboxClicked={this.handleCheckboxClicked} />
            {tasksDone.length > 0 && tasksNotDone.length > 0 && <Divider />}
            <TasksElement tasks={tasksDone} handleCheckboxClicked={this.handleCheckboxClicked} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

TasksCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TasksCard);
