import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./components/home/Home";
import Article from "./components/article/Article";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import "./styles.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="article/:id" component={Article} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
