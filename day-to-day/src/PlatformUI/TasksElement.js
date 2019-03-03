import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import InputBase from "@material-ui/core/InputBase";

import InputAdornment from "@material-ui/core/InputAdornment";

import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import DeleteIcon from "@material-ui/icons/Delete";

const styles = {};

const menuOptions = ["Add subtask", "Delete"];

const ITEM_HEIGHT = 48;

class TasksElement extends Component {
  state = {
    deleteIconHidden: {}
  };

  handleClick = (taskId, event) => {
    this.setState({ ["anchorEl" + taskId]: event.currentTarget });
  };

  handleClose = (option, taskId) => {
    this.setState({ ["anchorEl" + taskId]: null });
    if (option !== "close") {
      this.props.tapElementMenu(option, taskId);
    }
  };

  deleteSubtask = (subtaskId) => {
    this.props.deleteSubtask(subtaskId);
  }

  handleCheckboxClicked = taskId => event => {
    this.props.handleCheckboxClicked(taskId);
  };

  handleInputChange = (taskId, event) => {
    this.props.handleInputChange(taskId, event.target.value);
  };

  handleKeyPress = (taskId, event) => {
    if (event.key === "Enter") {
      this.props.handleKeyPress(taskId);
    }
  };

  onMouseEnter = subtaskId => {
    this.setState({ ["subtaskDeleteIconVisible" + subtaskId]: true });
  };

  onMouseLeave = subtaskId => {
    this.setState({ ["subtaskDeleteIconVisible" + subtaskId]: false });
  };

  render() {
    const { classes, tasks } = this.props;
    return tasks.map(task => {
      const anchorElTaskId = "anchorEl" + task.id;
      const anchorEl = this.state[anchorElTaskId] || null;
      const open = Boolean(anchorEl);

      return (
        <div key={task.id}>
          <ListItem key={task.id} role={undefined} dense button>
            <Checkbox
              checked={task.done}
              tabIndex={-1}
              disableRipple
              onChange={this.handleCheckboxClicked(task.id)}
              disabled={task.description === "Add task description here..."}
            />
            {task.needsEditFocus && (
              <InputBase
                className={classes.margin}
                placeholder={task.description}
                fullWidth
                onChange={event => {
                  this.handleInputChange(task.id, event);
                }}
                onKeyPress={event => {
                  this.handleKeyPress(task.parentId, event);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <div key={task.id}>
                      <IconButton
                        aria-label="More"
                        aria-owns={open ? "long-menu" : undefined}
                        aria-haspopup="true"
                        onClick={e => {
                          this.handleClick(task.id, e);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id={"menu" + task.id}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => {
                          this.handleClose("close", task.id);
                        }}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200
                          }
                        }}
                      >
                        {menuOptions.map(option => (
                          <MenuItem
                            key={option}
                            onClick={() => {
                              this.handleClose(option, task.id);
                            }}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  </InputAdornment>
                }
              />
            )}
            {!task.needsEditFocus && (
              <InputBase
                className={classes.margin}
                defaultValue={task.description}
                fullWidth
                onChange={event => {
                  this.handleInputChange(task.id, event);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <div key={task.id}>
                      <IconButton
                        aria-label="More"
                        aria-owns={open ? "long-menu" : undefined}
                        aria-haspopup="true"
                        onClick={e => {
                          this.handleClick(task.id, e);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id={"menu" + task.id}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => {
                          this.handleClose("close", task.id);
                        }}
                        PaperProps={{
                          style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200
                          }
                        }}
                      >
                        {menuOptions.map(option => (
                          <MenuItem
                            key={option}
                            onClick={() => {
                              this.handleClose(option, task.id);
                            }}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  </InputAdornment>
                }
              />
            )}
          </ListItem>
          {task.children &&
            task.children.map(subtask => {
              let deleteIconVisible = this.state[
                "subtaskDeleteIconVisible" + subtask.id
              ];
              return (
                <div key={subtask.id}>
                  <ListItem
                    key={subtask.id}
                    role={undefined}
                    dense
                    button
                    style={{
                      marginLeft: "30px"
                    }}
                    onMouseEnter={() => {
                      this.onMouseEnter(subtask.id);
                    }}
                    onMouseLeave={() => {
                      this.onMouseLeave(subtask.id);
                    }}
                  >
                    <Checkbox
                      checked={subtask.done}
                      tabIndex={-1}
                      disableRipple
                      onChange={this.handleCheckboxClicked(subtask.id)}
                      disabled={
                        subtask.description === "Add task description here..."
                      }
                    />
                    {subtask.needsEditFocus && (
                      <InputBase
                        className={classes.margin}
                        placeholder={subtask.description}
                        fullWidth
                        onChange={event => {
                          this.handleInputChange(subtask.id, event);
                        }}
                        onKeyPress={event => {
                          this.handleKeyPress(subtask.parentId, event);
                        }}
                      />
                    )}
                    {!subtask.needsEditFocus && (
                      <InputBase
                        className={classes.margin}
                        defaultValue={subtask.description}
                        fullWidth
                        onChange={event => {
                          this.handleInputChange(subtask.id, event);
                        }}
                      />
                    )}
                    <IconButton
                      aria-label="Delete"
                      hidden={!deleteIconVisible}
                      onClick={() => { this.deleteSubtask(subtask.id) }}
                      style={{marginRight: "30px"}}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                </div>
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
