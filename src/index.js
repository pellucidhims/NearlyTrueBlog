import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { SITE_ID } from "./constants/Constants";

import Home from "./components/home/Home";
import Article from "./components/article/Article";
import SideBar from "./components/sideBar/SideBar";
import PageNotFound from "./components/pageNotFound/PageNotFound";

import { getSiteCategoriesAndTags } from "./apiFunctionCalls/ApiFunctionCalls";

import "typeface-roboto";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteCategories: undefined,
      siteTags: undefined
    };
    this.getResponse = this.getResponse.bind(this);
  }

  async getResponse() {
    let responsesArray = [];
    responsesArray = await getSiteCategoriesAndTags(SITE_ID);
    return responsesArray;
  }

  componentDidMount() {
    this.getResponse()
      .then(responsesArray => {
        this.setState(
          {
            siteCategories: responsesArray[0],
            siteTags: responsesArray[1]
          },
          () => {
            console.log("cat and tags >> ", this.state);
          }
        );
      })
      .catch(err => {
        console.log("Something went wrong: ", err);
      });
  }

  render() {
    if (this.state.siteCategories && this.state.siteTags) {
      return (
        <div className="nearlyTrueBlog-app-main-div">
          <Router>
            <div className="nearlyTrueBlog-app-side-bar-main-div">
              <SideBar
                data={{
                  cat: this.state.siteCategories,
                  tag: this.state.siteTags
                }}
              />
            </div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/articles/:id" component={Article} />
              <Route component={PageNotFound} />
            </Switch>
          </Router>
        </div>
      );
    } else {
      return <div style={{ textAlign: "center" }}>Loading awesome UI...</div>;
    }
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
