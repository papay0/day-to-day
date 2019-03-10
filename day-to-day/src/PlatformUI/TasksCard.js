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
import { formatDate } from "../Utils/Date";

const styles = {};

class TasksCard extends Component {
  state = {
    tasks: this.props.tasks,
    email: this.props.email
  };

  saveTasks = tasks => {
    this.setState({ tasks: tasks });
    this.saveOnDatabase(this.props.id, tasks);
  };

  saveOnDatabase = (id, tasks) => {
    this.props.saveTasksDatabase(id, tasks, this.props.day, this.state.email);
  };

  everySubtaskIsDone = subtasks => {
    return subtasks.every(subtask => subtask.done);
  };

  updateOrderTasks = tasks => {
    const filteredTasks = tasks.map(task => {
      const filteredTask = task;
      filteredTask.children = filteredTask.children.filter(
        subtask => subtask.description !== "Add task description here..."
      );
      return filteredTask;
    });
    const tasksNotDone = filteredTasks.filter(
      task => !task.done && task.description !== "Add task description here..."
    );
    const tasksDone = filteredTasks.filter(
      task => task.done && task.description !== "Add task description here..."
    );
    return tasksNotDone.concat(tasksDone);
  };

  handleCheckboxClicked = taskId => {
    const tasks = this.state.tasks.slice();

    for (let task of tasks) {
      if (task.id === taskId) {
        task.done = !task.done;
        task.needsEditFocus = false;
        task.children.map(subtasks => (subtasks.done = task.done));
      }
      for (let subtask of task.children) {
        subtask.needsEditFocus = false;
        if (subtask.id === taskId) {
          subtask.done = !subtask.done;
          if (this.everySubtaskIsDone(task.children)) {
            task.done = true;
            task.needsEditFocus = false;
          } else {
            task.done = false;
            task.needsEditFocus = false;
          }
          continue;
        }
      }
    }
    this.saveTasks(this.updateOrderTasks(tasks));
  };

  createNewTask = parentId => {
    return {
      type: "task",
      description: "Add task description here...",
      done: false,
      id: new Date().getTime(),
      parentId: parentId,
      children: [],
      needsEditFocus: true
    };
  };

  addNewTask = () => {
    const newTask = this.createNewTask(null);
    this.saveTasks([newTask].concat(this.state.tasks));
  };

  addNewSubtask = parentId => {
    const newTask = this.createNewTask(parentId);
    const tasks = this.state.tasks.slice();

    for (let task of tasks) {
      if (task.id === parentId) {
        task.children.push(newTask);
        continue;
      }
    }
    this.saveTasks(tasks);
  };

  handleInputChange = (taskId, description) => {
    const tasks = this.state.tasks.slice();

    for (let task of tasks) {
      if (task.id === taskId) {
        task.description = description;
        continue;
      }
      for (let subtask of task.children) {
        if (subtask.id === taskId) {
          subtask.description = description;
          continue;
        }
      }
    }
    this.saveTasks(tasks);
  };

  handleKeyPress = taskId => {
    this.addNewElement(taskId);
  };

  addNewElement = parentId => {
    // if parentId null: add new one, otherwise add subtask
    if (parentId === null) {
      this.addNewTask();
    } else {
      this.addNewSubtask(parentId);
    }
  };

  deleteTask = taskId => {
    const tasks = this.state.tasks.filter(task => task.id !== taskId);
    this.saveTasks(tasks);
  };

  deleteSubtask = subtaskId => {
    const tasks = this.state.tasks.map(task => {
      const filteredTask = task;
      filteredTask.children = filteredTask.children.filter(
        subtask => subtask.id !== subtaskId
      );
      return filteredTask;
    });
    this.saveTasks(tasks);
  };

  tapElementMenu = (option, taskId) => {
    if (option === "Add subtask") {
      this.addNewSubtask(taskId);
    } else if (option === "Delete") {
      this.deleteTask(taskId);
    }
  };

  render() {
    const { classes, day, id } = this.props;
    console.log("id = " + id);
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
            title={formatDate(day)}
            action={
              <Fab
                color="primary"
                size="small"
                aria-label="Add"
                className={classes.fab}
                onClick={this.addNewTask}
                style={{ marginRight: "28px" }}
              >
                <AddIcon />
              </Fab>
            }
          />
          <Divider />
          <CardContent>
            <TasksElement
              tasks={tasksNotDone}
              handleCheckboxClicked={this.handleCheckboxClicked}
              handleInputChange={this.handleInputChange}
              handleKeyPress={this.handleKeyPress}
              tapElementMenu={this.tapElementMenu}
              deleteSubtask={this.deleteSubtask}
            />
            {tasksDone.length > 0 && tasksNotDone.length > 0 && <Divider />}
            <TasksElement
              tasks={tasksDone}
              handleCheckboxClicked={this.handleCheckboxClicked}
              handleInputChange={this.handleInputChange}
              handleKeyPress={this.handleKeyPress}
              tapElementMenu={this.tapElementMenu}
              deleteSubtask={this.deleteSubtask}
            />
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
