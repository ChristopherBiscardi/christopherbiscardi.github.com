/**
 * Normalize styles are first, so they end up first in the stylesheet
 */
import 'sanitize.css/sanitize.css';
import 'normalize-opentype.css/normalize-opentype.css';
import "./css/highlight.css";
import "midas/dist/themes/apathy-light.css"
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';

import Home from './component-tree/Home';
import Post from './component-tree/Post';
import Posts from './component-tree/Posts';
import About from './component-tree/About';
import App from './component-tree';
import styles from './routes.css';

class NoMatch extends Component {
  render() {
    return (
      <div>404</div>
    )
  }
}

export default (
  <Route path='/' component={App}>
    <Route
      path='/posts/'
      component={Posts}
    />
    <Route
      path='/about/'
      component={About}
    />
    <Route
      path=':slug/'
      component={Post}
    />
    <Route
      path='/:year/:month/:day/:slug/'
      component={Post}
    />
    <IndexRoute component={Home} />
    <Route path='*' component={NoMatch} />
  </Route>
)
