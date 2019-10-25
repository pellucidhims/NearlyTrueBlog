import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router";

import "./styles.css";

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "tags"
    };
  }

  handleChange = (e, newValue) => {
    this.setState({
      currentTab: newValue
    });
  };

  // handlePostsByTag = tagName => e => {
  //   console.log("clicked tag: ", tagName);

  // };

  handlePostsByTag = tagName => e => {
    this.props.history.push({
      pathname: "/",
      state: { refData: { tagName: tagName } }
    });
  };

  renderCategories = cat => {
    return (
      <ul className="nearlyTureApp-unordered-list">
        {cat.data.categories.map(catItem => {
          return (
            <li key={catItem.ID} className="nearlyTureApp-unordered-list-item">
              {catItem.name.toUpperCase()}
            </li>
          );
        })}
      </ul>
    );
  };
  renderTags = tags => {
    return (
      <ul className="nearlyTureApp-unordered-list">
        {tags.data.tags.map(tagItem => {
          return (
            <li
              key={tagItem.ID}
              className="nearlyTureApp-unordered-list-item"
              onClick={this.handlePostsByTag(tagItem.slug)}
            >
              {tagItem.name.toUpperCase()}
            </li>
          );
        })}
      </ul>
    );
  };

  render() {
    const { cat, tag } = this.props.data;
    return (
      <div>
        <AppBar position="static">
          <Tabs
            value={this.state.currentTab}
            onChange={this.handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab
              value="categories"
              label={`Categories (Top 10 of ${cat.data.found})`}
              wrapped
              {...a11yProps("categories")}
            />
            <Tab
              value="tags"
              label={`Tags (Top 10 of ${tag.data.found})`}
              wrapped
              {...a11yProps("tags")}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.currentTab} index="categories">
          {this.renderCategories(cat)}
        </TabPanel>
        <TabPanel value={this.state.currentTab} index="tags">
          {this.renderTags(tag)}
        </TabPanel>
        <div className="nearlyTrueApp-side-bar-timeline-button-main-div">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Timeline</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(SideBar);
