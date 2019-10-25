import React, { Component } from "react";

import CardsCollection from "../cardsCollection/cardsCollection";
import Typography from "@material-ui/core/Typography";
import Loader from "../loader/Loader";
import {
  getRelatedPosts,
  getRelatedPostDetails
} from "../../apiFunctionCalls/ApiFunctionCalls";

import "./styles.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedPosts: undefined,
      postsDetailsReceived: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.path !== prevProps.location.path) {
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let { site_ID, ID } = this.props.location.state.cardData;
    let relatedPosts;
    async function getResponse() {
      relatedPosts = await getRelatedPosts(site_ID, ID, 3);
      return relatedPosts;
    }
    async function getRelatedPostResponseData(postsArray) {
      relatedPosts = await getRelatedPostDetails(postsArray);
      return relatedPosts;
    }

    getResponse()
      .then(relatedPosts => {
        this.setState(
          {
            relatedPosts: relatedPosts.hits
          },
          () => {
            let postsArr = this.state.relatedPosts.map(postItem => {
              return {
                post_id: postItem.fields.post_id,
                site_id: postItem.fields.blog_id
              };
            });
            getRelatedPostResponseData(postsArr)
              .then(relatedPostsDetails => {
                let modifiedPostsDetails = this.state.relatedPosts;
                for (let i = 0; i < modifiedPostsDetails.length; i++) {
                  modifiedPostsDetails[i] = Object.assign(
                    {},
                    modifiedPostsDetails[i],
                    relatedPostsDetails[i].data
                  );
                }
                this.setState({
                  relatedPosts: modifiedPostsDetails,
                  postsDetailsReceived: true
                });
              })
              .catch(err => {
                console.log(
                  "Something went wrong in getRelatedPostResponseData: ",
                  err
                );
              });
          }
        );
      })
      .catch(err => {
        console.log("Something went wrong in getPostsResponse", err);
      });
  }

  componentWillUnmount() {
    this.setState({
      postsDetailsReceived: false
    });
  }

  renderRelatedPosts = () => {
    if (this.state.postsDetailsReceived) {
      return (
        <div>
          <Typography
            variant="h5"
            gutterBottom
            style={{ marginLeft: "0.5rem" }}
          >
            You might also like...
          </Typography>
          <CardsCollection cardsData={this.state.relatedPosts} />
        </div>
      );
    }
  };

  render() {
    const { params } = this.props.match;
    const { cardData } = this.props.location.state;
    // console.log("Card data received: ", cardData);
    if (this.state.postsDetailsReceived) {
      return (
        <div className="nearlyTrueApp-article-content-main-div">
          <div
            dangerouslySetInnerHTML={{ __html: cardData.content }}
            className="nearlyTrueApp-article-content-div"
          />
          <div className="nearlyTrueApp-article-suggestions-main-div">
            {this.state.postsDetailsReceived ? (
              this.renderRelatedPosts()
            ) : (
              <Loader message={"Loading similar posts..."} size={18} />
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p syle={{ marginLeft: "250px" }}>
            <Loader message={"Giving Final Touch up..."} size={18} />
          </p>
        </div>
      );
    }
  }
}

export default Article;
