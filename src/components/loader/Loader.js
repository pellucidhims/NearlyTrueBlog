import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class Loader extends Component {
  render() {
    return (
      <p style={{ margin: "0px" }}>
        <CircularProgress color="secondary" size={this.props.size || 12} />
        &nbsp;
        {this.props.message || ``}
      </p>
    );
  }
}
