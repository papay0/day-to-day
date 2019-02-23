import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";

const styles = {};

class DailyCard extends Component {
  render() {
    const { classes, day } = this.props;
    return (
      <div>
        <Card className={classes.card} style={{ marginTop: '20px', marginBottom: '20px' }}>
          <CardHeader title={day} />
          <Divider />
          <CardContent>
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

DailyCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DailyCard);
