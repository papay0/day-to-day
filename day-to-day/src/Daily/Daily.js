import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TasksCard from "../PlatformUI/TasksCard";
import axios from "axios";
import { getToday, getTomorrow } from "../Utils/Date";
import { debounce } from "lodash";

const styles = {};

class Daily extends Component {
  state = {
    email: this.props.email,
    cards: []
  };

  saveTasksDatabase = debounce((cardId, tasks, date, email) => {
    console.log("save database")
    const cleanedTasks = this.prepareForSaving(tasks);
    axios
      .post(
        "https://us-central1-daytoday-app.cloudfunctions.net/API/tasks",
        {
          email: email,
          card: { date: String(date), tasks: cleanedTasks },
          id: cardId
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(res => {
        // console.log("res posts = " + JSON.stringify(res))
      });
  }, 500);

  prepareForSaving(tasksToSave) {
    const tasks = JSON.parse(JSON.stringify(tasksToSave));
    const filteredTasks = tasks
      .filter(task => task.description !== "Add task description here...")
      .map(task => {
        const filteredTask = task;
        filteredTask.children = filteredTask.children.filter(
          subtask => subtask.description !== "Add task description here..."
        );
        return filteredTask;
      });
    for (let task of filteredTasks) {
      task.needsEditFocus = false;
      for (let subtask of task.children) {
        subtask.needsEditFocus = false;
      }
    }

    return filteredTasks;
  }

  componentDidMount() {
    const todayOnClient = getToday();
    const tomorrowOnClient = getTomorrow();
    axios
      .get(
        "https://us-central1-daytoday-app.cloudfunctions.net/API/tasks",
        {
          params: {
            email: this.state.email,
            todayOnClient: todayOnClient,
            tomorrowOnClient: tomorrowOnClient
          }
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(res => {
        // console.log("tasks: " + JSON.stringify(res.data));
        this.setState({ cards: res.data });
      });
  }

  prepareUIData(cardsArray) {
    return cardsArray.sort(
      (card1, card2) => card2.tasks.date - card1.tasks.date
    );
  }

  render() {
    const sortedCards = this.prepareUIData(this.state.cards);
    return sortedCards.map(card => {
      const date = parseInt(card.tasks.date);
      return (
        <TasksCard
          day={date}
          key={card.id}
          tasks={card.tasks.tasks}
          id={card.id}
          email={this.props.email}
          saveTasksDatabase={(cardId, tasks, date, email) =>
            this.saveTasksDatabase(cardId, tasks, date, email)
          }
        />
      );
    });
  }
}

Daily.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Daily);