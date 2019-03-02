import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import InputBase from "@material-ui/core/InputBase";

const styles = {};

class TaskCard extends Component {
  state = {
    tasks: this.props.tasks
  };

  handleCheckboxClicked = taskId => event => {
    console.log("Checkbox: ", taskId);
    const tasks = this.state.tasks.slice();

    for (let task of tasks) {
      if (task.id === taskId) {
        task.done = !task.done;
      }
    }
    this.setState({ tasks: tasks });
  };

  render() {
    const { classes, day, tasks } = this.props;
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
            {tasks.map(task => {
              return (
                <ListItem
                  key={task.id}
                  role={undefined}
                  dense
                  button
                  style={{
                    marginLeft: task.type === "subtask" ? "30px" : "0px"
                  }}
                >
                  <Checkbox
                    checked={task.done}
                    tabIndex={-1}
                    disableRipple
                    onChange={this.handleCheckboxClicked(task.id)}
                  />
                  <InputBase
                    className={classes.margin}
                    defaultValue={task.description}
                    fullWidth
                  />
                </ListItem>
              );
            })}
          </CardContent>
        </Card>
      </div>
    );
  }
}

TaskCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskCard);
