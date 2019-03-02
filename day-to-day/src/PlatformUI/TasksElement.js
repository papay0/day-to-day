import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import InputBase from "@material-ui/core/InputBase";

const styles = {};

class TasksElement extends Component {
  handleCheckboxClicked = taskId => event => {
    this.props.handleCheckboxClicked(taskId);
  };

  render() {
    const { classes, tasks } = this.props;
    return tasks.map(task => {
      return (
        <div key={task.id}>
          <ListItem key={task.id} role={undefined} dense button>
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
          {task.children &&
            task.children.map(subtask => {
              return (
                <ListItem
                  key={subtask.id}
                  role={undefined}
                  dense
                  button
                  style={{
                    marginLeft: "30px"
                  }}
                >
                  <Checkbox
                    checked={subtask.done}
                    tabIndex={-1}
                    disableRipple
                    onChange={this.handleCheckboxClicked(subtask.id)}
                  />
                  <InputBase
                    className={classes.margin}
                    defaultValue={subtask.description}
                    fullWidth
                  />
                </ListItem>
              );
            })}
        </div>
      );
    });
  }
}

TasksElement.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TasksElement);
