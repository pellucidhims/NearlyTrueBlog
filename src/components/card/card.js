import React, { Component } from "react";
import classnames from "classnames";
import _ from "lodash";

import { Link } from "react-router-dom";

import { transformDataforCard } from "../../utilities/transformers/transformers";

import "./styles.css";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transformedData: transformDataforCard(this.props.cardData)
    };
    this.debouncedScroll = _.debounce(this.handleScroll, 100);
  }

  persistScroll = e => {
    e.persist();
    this.debouncedScroll(e);
  };

  handleScroll = e => {
    let scrollObject = {
      id: this.state.transformedData.id,
      ...e
    };
    this.props.scrollEvent(scrollObject);
  };

  renderCardTitle = () => {
    return `${this.state.transformedData.name}`;
  };

  renderCardImage = () => {
    let imgClass = classnames("card-image-main-div", {
      "card-image-shrink-main-div":
        this.state.transformedData.isScrolled || false
    });
    return (
      <img
        className={imgClass}
        src={this.state.transformedData.cardImageUrl}
        alt="card-display"
      />
    );
  };

  renderCardContent = () => {
    return (
      <p
        style={{ margin: "0px", fontSize: "14px" }}
        dangerouslySetInnerHTML={{
          __html: this.state.transformedData.cardContentText
        }}
      />
    );
  };

  render() {
    let { isScrolled } = this.state.transformedData;
    let contentTextClass = classnames("card-content-main-div", {
      "card-content-expand-main-div": isScrolled || false
    });
    return (
      <Link
        to={{
          path: `articles/${this.state.transformedData.id}`,
          state: { cardData: this.props.cardData }
        }}
        style={{ textDecoration: "none" }}
      >
        <div className="card-main-div">
          <div className="card-heading-image-main-div">
            <div
              className="card-heading-main-div"
              title={`${this.state.transformedData.name}`}
            >
              {this.renderCardTitle()}
            </div>
            <div>{this.renderCardImage()}</div>
          </div>
          <div className={contentTextClass} onScroll={this.persistScroll}>
            {this.renderCardContent()}
          </div>
        </div>
      </Link>
    );
  }
}
