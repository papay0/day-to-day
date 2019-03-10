import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TasksCard from "../PlatformUI/TasksCard";
import axios from "axios";


const styles = {};

class Daily extends Component {
  state = {
    email: this.props.email,
    cards: [
    ]
  };

  saveTasksDatabase(cardId, tasks, date, email) {
    axios.post(
      "https://us-central1-daytoday-app.cloudfunctions.net/API/tasks",
      {
        email: email,
        card: { date: date, tasks: tasks },
        id: cardId
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
  }

  componentDidMount() {
    axios
      .get(
        "https://us-central1-daytoday-app.cloudfunctions.net/API/tasks",
        {
          params: {
            email: this.state.email
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
    return cardsArray.sort((card1, card2) => card2.tasks.date - card1.tasks.date)
  }

  render() {
    const sortedCards = this.prepareUIData(this.state.cards);
    return sortedCards.map(card => {
      const date = card.tasks.date;
      return <TasksCard day={date} key={card.id} tasks={card.tasks.tasks} id={card.id} email={this.props.email} saveTasksDatabase={this.saveTasksDatabase} />;
    });
  }
}

Daily.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Daily);

// {
      //   day: "Wednesday 25th February",
      //   tasks: [
      //     {
      //       type: "task",
      //       description: "Create Android Driver app",
      //       done: false,
      //       id: "abcd",
      //       parentId: null,
      //       needsEditFocus: false,
      //       children: [
      //         {
      //           type: "subtask",
      //           description: "Read about Android architecture",
      //           done: true,
      //           id: "yeye",
      //           parentId: "abcd",
      //           needsEditFocus: false,
      //         },
      //         {
      //           type: "subtask",
      //           description: "Read about Kotlin",
      //           done: true,
      //           id: "yeyesfd",
      //           parentId: "abcd",
      //           needsEditFocus: false,
      //         },
      //         {
      //           type: "subtask",
      //           description: "Install IntelliJ",
      //           done: false,
      //           id: "fdssfd",
      //           parentId: "abcd",
      //           needsEditFocus: false,
      //         }
      //       ]
      //     },
      //     {
      //       type: "task",
      //       description: "Known issues",
      //       done: false,
      //       id: "iiuh",
      //       parentId: null,
      //       needsEditFocus: false,
      //       children: [
      //         {
      //           type: "subtask",
      //           description: "Css subtask not well right aligned",
      //           done: false,
      //           id: "lkjlkj",
      //           parentId: "iiuh",
      //           needsEditFocus: false,
      //         }
      //       ]
      //     },
      //     {
      //       type: "task",
      //       description: "Hi",
      //       done: false,
      //       id: "iiuhfssdfsdfsdf",
      //       parentId: null,
      //       children: [],
      //       needsEditFocus: false,
      //     }
      //   ]
      // }