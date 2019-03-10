import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TasksCard from "../PlatformUI/TasksCard";
import axios from "axios";

const styles = {};

class Stamdup extends Component {
  state = {
    email: this.props.email,
    cards: []
  };
  componentDidMount() {
    axios
      .get(
        "https://us-central1-daytoday-app.cloudfunctions.net/API/standup",
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
        console.log("Standup: " + JSON.stringify(res.data));
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
      const date = card.tasks.date;
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

Stamdup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Stamdup);