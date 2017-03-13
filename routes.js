/**
 * Normalize styles are first, so they end up first in the stylesheet
 */
import "sanitize.css/sanitize.css";
import "normalize-opentype.css/normalize-opentype.css";
import "./css/highlight.css";
import "midas/dist/themes/apathy-light.css";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./component-tree/Home";
import Post from "./component-tree/Post";
import Posts from "./component-tree/Posts";
import About from "./component-tree/About";
import App from "./component-tree";
import styles from "./routes.css";

class NoMatch extends Component {
  render() {
    return <div>404</div>;
  }
}

export default (
  <App>
    <Switch>
      <Route exact path="/posts/" component={Posts} />
      <Route exact path="/about/" component={About} />
      <Route exact path="/:slug" component={Post} />
      <Route exact path="/:year/:month/:day/:slug" component={Post} />
      <Route exact path="/" component={Home} />
      <Route component={NoMatch} />
    </Switch>
  </App>
);
