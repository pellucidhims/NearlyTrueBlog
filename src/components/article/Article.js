import React, { Component } from "react";

class Article extends Component {
  render() {
    let { params } = this.props.match;
    return <div>Article Id - {params.id}</div>;
  }
}

export default Article;
