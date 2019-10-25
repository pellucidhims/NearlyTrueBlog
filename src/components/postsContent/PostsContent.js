import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import PostCard from "../postCard/PostCard";
import Loader from "../loader/Loader";

import "./styles.css";

export default class PostsContent extends Component {
  renderPostTemplate = posts => {
    return posts.map(postItem => {
      return <PostCard cardData={postItem} key={postItem.ID} />;
    });
  };

  handleLoadMore = () => {
    this.props.loadMoreContent();
  };

  render() {
    const posts = this.props.data;
    if (posts && posts.length > 0) {
      return (
        <div className="nearlyTrueBlog-posts-content-main-div">
          {this.renderPostTemplate(posts)}
          <Button
            variant="outlined"
            onClick={this.handleLoadMore}
            style={{ float: "right", margin: "1rem" }}
          >
            {this.props.loadingText ? (
              <Loader message={this.props.loadingText} size={12} />
            ) : (
              `Read More`
            )}
          </Button>
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          Loading posts curated just for you...
        </div>
      );
    }
  }
}
