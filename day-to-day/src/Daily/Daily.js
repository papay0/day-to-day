import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";

const styles = {};

class Daily extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader title="Monday 12 February" />
          <Divider />
          <CardContent style={{ marginLeft: "auto" }}>
            - Task 1 <br />
            - Task 1 <br />
            - Task 1 <br />
            - Task 1 <br />
          </CardContent>
        </Card>
        <br />
        <Card className={classes.card}>
          <CardHeader title="Monday 12 February" />
          <Divider />
          <CardContent style={{ marginLeft: "auto" }}>
            - Task 1 <br />
            - Task 1 <br />
            - Task 1 <br />
            - Task 1 <br />
          </CardContent>
        </Card>
      </div>
    );
  }
}

Daily.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Daily);
