import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Timeago from "react-timeago";
import { Link, Redirect } from "react-router-dom";

import "./styles.css";

export default class PostCard extends Component {
  render() {
    const { cardData } = this.props;
    let imgURL;
    if (cardData.post_thumbnail && cardData.post_thumbnail !== null) {
      imgURL = cardData.post_thumbnail.URL;
    } else {
      imgURL = `https://waymakerlearning.com/wp-content/uploads/2019/06/Truecaller-840x430.jpg`;
    }
    return (
      <div className="nearlyTrueApp-post-card-main-div">
        <Link
          to={{
            pathname: `/articles/${cardData.ID}`,
            state: { cardData: cardData }
          }}
          style={{ textDecoration: "none" }}
        >
          <img
            src={imgURL}
            height={380}
            width={800}
            alt="post-card-data"
            onClick={this.handleRedirect}
            className="nearlyTureApp-post-card-image-div"
          />
          <Typography
            variant="h5"
            gutterBottom
            dangerouslySetInnerHTML={{ __html: cardData.title }}
          />
          <Typography variant="caption" display="block" gutterBottom>
            {`Posted `}
            <Timeago date={new Date(cardData.date).toDateString()} />{" "}
            {`${cardData.author ? `by ${cardData.author.name}` : ""}`}
          </Typography>
        </Link>

        <div className="nearlyTrueApp-excerpt-and-read-more-main-div">
          <Typography
            variant="body1"
            gutterBottom
            dangerouslySetInnerHTML={{ __html: cardData.excerpt }}
            style={{ textAlign: "left", width: "700px" }}
          />
          <Link
            to={{
              pathname: `/articles/${cardData.ID}`,
              state: { cardData: cardData }
            }}
            style={{ textDecoration: "none" }}
          >
            <Button color="secondary" variant="contained">
              Dive in...
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}
