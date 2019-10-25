import React, { Component } from "react";
import Card from "../card/card";
import Loader from "../loader/Loader";

import "./styles.css";

export default class CardsCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _cardData: this.props.cardsData
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      _cardData: nextProps.cardsData
    });
  }

  handleOnScroll = evtObject => {
    console.log("State cardData >>> ", [...this.state._cardData]);
    let changedCardData = this.state._cardData;
    let isTextScrolled = evtObject.target.scrollTop > 5 ? true : false;
    changedCardData = changedCardData.map((item, idx) => {
      if (item.ID === evtObject.id) {
        item.isScrolled = isTextScrolled;
      }
      return item;
    });
    this.setState({
      _cardData: changedCardData
    });
  };

  renderCards = cardData => {
    let _cardJsx;
    _cardJsx = cardData.map((item, idx) => {
      return (
        <Card key={item.ID} cardData={item} scrollEvent={this.handleOnScroll} />
      );
    });
    return _cardJsx;
  };

  render() {
    return (
      <div className="cards-collection-main-div">
        {this.state._cardData && this.state._cardData.length > 0 ? (
          this.renderCards(this.state._cardData)
        ) : (
          <Loader message={"Loading Posts..."} size={18} />
        )}
      </div>
    );
  }
}
