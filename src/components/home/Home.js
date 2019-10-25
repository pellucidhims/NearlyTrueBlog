import React, { Component } from "react";
import { SITE_ID } from "../../constants/Constants";
import { withRouter } from "react-router";
import Loader from "../loader/Loader";
// import Article from "../article/Article";

import { getPosts } from "../../apiFunctionCalls/ApiFunctionCalls";

import PostsContent from "../postsContent/PostsContent";

import "./styles.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastPostTimeStamp: undefined,
      allPosts: [],
      loadByTag: this.props.location.state
        ? this.props.location.state.refData.tagName
        : undefined,
      loadingText: undefined
    };
    this.getPostsResponse = this.getPostsResponse.bind(this);
  }

  async getPostsResponse(timeStamp = undefined) {
    let postsResponse;
    let isoTS = timeStamp ? new Date(timeStamp) : undefined;
    if (isoTS) {
      isoTS = isoTS.toISOString();
    }
    postsResponse = await getPosts(SITE_ID, isoTS, this.state.loadByTag);
    return postsResponse;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.location.state !== this.props.location.state) {
      let newTagName;
      let lastPostTimeStamp = this.state.lastPostTimeStamp;
      if (nextProps.location.state) {
        newTagName = nextProps.location.state.refData.tagName;
        lastPostTimeStamp = undefined;
      }
      this.setState(
        {
          loadByTag: newTagName,
          allPosts: [],
          lastPostTimeStamp: lastPostTimeStamp
        },
        () => {
          this.loadMorePosts();
          window.scrollTo(0, 0);
        }
      );
    }
  }

  componentDidMount() {
    console.log("Mounting HOME compt now: ");
    console.log(">>> home component props: ", this.props);
    if (!sessionStorage.getItem("preLoadedData")) {
      this.loadMorePosts();
    }
  }

  componentWillUnmount() {
    console.log("Now unmounting timeline HOME component...");
    if (typeof Storage !== undefined) {
      sessionStorage.setItem("saveScrollAmount", window.pageYOffset);
      sessionStorage.setItem("lastTimeStamp", this.state.lastPostTimeStamp);
      sessionStorage.setItem(
        "preLoadedData",
        JSON.stringify(this.state.allPosts)
      );
    }
  }

  UNSAFE_componentWillMount() {
    let preSroll = sessionStorage.getItem("saveScrollAmount");
    let lastTimeStamp = sessionStorage.getItem("lastTimeStamp");
    let preLoadedData = sessionStorage.getItem("preLoadedData");
    preLoadedData = JSON.parse(preLoadedData);
    if (preLoadedData && preLoadedData.length > 0) {
      this.setState(
        {
          allPosts: preLoadedData,
          lastPostTimeStamp: lastTimeStamp
        },
        () => {
          window.scrollTo(0, preSroll || 0);
        }
      );
    }
  }

  loadMorePosts = () => {
    this.setState({
      loadingText: "Fetching..."
    });
    this.getPostsResponse(this.state.lastPostTimeStamp)
      .then(postsResponse => {
        console.log("LoadMorePosts resp: ", postsResponse);
        this.setState(
          {
            allPosts: [...this.state.allPosts, ...postsResponse.data.posts]
          },
          () => {
            this.setState(
              {
                lastPostTimeStamp:
                  this.state.allPosts && this.state.allPosts.length > 0
                    ? this.state.allPosts[this.state.allPosts.length - 1].date
                    : undefined,
                loadingText: undefined
              },
              () => {
                console.log(
                  "Last logged time stamp: ",
                  this.state.lastPostTimeStamp
                );
              }
            );
          }
        );
      })
      .catch(err => {
        console.log("Something went wrong in getPostsResponse", err);
      });
  };

  render() {
    if (this.state.allPosts && this.state.allPosts.length > 0) {
      return (
        <div className="nearlyTrueBlog-app-content-main-div">
          <PostsContent
            data={this.state.allPosts}
            loadMoreContent={this.loadMorePosts}
            loadingText={this.state.loadingText}
          />
        </div>
      );
    } else {
      if (this.state.loadingText) {
        return (
          <div>
            <p style={{ marginLeft: "250px" }}>
              <Loader
                message={"Hang in there, loading posts for you..."}
                size={18}
              />
            </p>
          </div>
        );
      } else {
        return (
          <div>
            <p style={{ fontSize: "18px", marginLeft: "250px" }}>
              Sorry, No posts available for selected category.
            </p>
          </div>
        );
      }
    }
  }
}

export default withRouter(Home);
