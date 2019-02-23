import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";

import Checkbox from "@material-ui/core/Checkbox";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

const styles = {};

class DailyCard extends Component {
  state = {
    checked: true
  };

  handleChange = name => event => {
    this.setState({ checked: !this.state.checked });
  };

  render() {
    const { classes, day } = this.props;
    let checked = true;
    return (
      <div>
        <Card
          className={classes.card}
          style={{ marginTop: "20px", marginBottom: "20px" }}
        >
          <CardHeader title={day} />
          <Divider />
          <CardContent>
            <ListItem
              key="1"
              role={undefined}
              dense
              button
              onClick={this.handleChange()}
            >
              <Checkbox
                checked={this.state.checked}
                tabIndex={-1}
                disableRipple
                onChange={this.handleChange()}
              />
              <ListItemText primary="Line item 1 this is a super long text, will it bug, will it not, I am not sure but I will see that soon enough!" />
            </ListItem>
            <div>
              <ListItem
                key="2"
                role={undefined}
                dense
                button
                style={{ marginLeft: "30px" }}
                onClick={this.handleChange()}
              >
                <Checkbox
                  checked={this.state.checked}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary="Line item 2 a bit long Line item 2 a bit long Line item 2 a bit long " />
              </ListItem>
            </div>
            <ListItem
              key="3"
              role={undefined}
              dense
              button
              style={{ marginLeft: "30px" }}
              onClick={this.handleChange()}
            >
              <Checkbox
                checked={this.state.checked}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary="Line item 3" />
            </ListItem>
            <ListItem
              key="1"
              role={undefined}
              dense
              button
              onClick={this.handleChange()}
            >
              <Checkbox
                checked={this.state.checked}
                tabIndex={-1}
                disableRipple
                onChange={this.handleChange()}
              />
              <ListItemText primary="Line item 1 this is a super long text, will it bug, will it not, I am not sure but I will see that soon enough!" />
            </ListItem>
            <div>
              <ListItem
                key="2"
                role={undefined}
                dense
                button
                style={{ marginLeft: "30px" }}
                onClick={this.handleChange()}
              >
                <Checkbox
                  checked={this.state.checked}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary="Line item 2 a bit long Line item 2 a bit long Line item 2 a bit long " />
              </ListItem>
            </div>
            <ListItem
              key="3"
              role={undefined}
              dense
              button
              style={{ marginLeft: "30px" }}
              onClick={this.handleChange()}
            >
              <Checkbox
                checked={this.state.checked}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary="Line item 3" />
            </ListItem>
            <ListItem
              key="1"
              role={undefined}
              dense
              button
              onClick={this.handleChange()}
            >
              <Checkbox
                checked={this.state.checked}
                tabIndex={-1}
                disableRipple
                onChange={this.handleChange()}
              />
              <ListItemText primary="Line item 1 this is a super long text, will it bug, will it not, I am not sure but I will see that soon enough!" />
            </ListItem>
            <div>
              <ListItem
                key="2"
                role={undefined}
                dense
                button
                style={{ marginLeft: "30px" }}
                onClick={this.handleChange()}
              >
                <Checkbox
                  checked={this.state.checked}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary="Line item 2 a bit long Line item 2 a bit long Line item 2 a bit long " />
              </ListItem>
            </div>
            <ListItem
              key="3"
              role={undefined}
              dense
              button
              style={{ marginLeft: "30px" }}
              onClick={this.handleChange()}
            >
              <Checkbox
                checked={this.state.checked}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary="Line item 3" />
            </ListItem>
          </CardContent>
        </Card>
      </div>
    );
  }
}

DailyCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DailyCard);
