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
import ListItemText from "@material-ui/core/ListItemText";

const styles = {};

class TaskCard extends Component {
  state = {
    checked: true
  };

  handleChange = name => event => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { classes, day, tasks } = this.props;
    return (
      <div>
        <Card
          lassName={classes.card}
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
                  onClick={this.handleChange()}
                  style={{
                    marginLeft: task.type === "subtask" ? "30px" : "0px"
                  }}
                >
                  <Checkbox
                    checked={task.done}
                    tabIndex={-1}
                    disableRipple
                    onChange={this.handleChange()}
                  />
                  <ListItemText primary={task.description} />
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
