/**
 * Normalize styles are first, so they end up first in the stylesheet
 */
import 'sanitize.css/sanitize.css';
import 'normalize-opentype.css/normalize-opentype.css';
import "./css/highlight.css";
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import Relay from 'react-relay';

import Home from './component-tree/Home';
import Post from './component-tree/Post';
import Posts from './component-tree/Posts';
import App from './component-tree';
import styles from './routes.css';

class NoMatch extends Component {
  render() {
    return (
      <div>404</div>
    )
  }
}

const RootQuery = {
  root: () => Relay.QL`query RootQuery { root }`
}

export default (
  <Route path='/' component={App}>
    <Route path='/posts/'
           queries={RootQuery}
           component={Posts} />
    <Route path=':slug'
           component={Post}
           queries={RootQuery} />
    <Route path='/:year/:month/:day/:slug/'
           component={Post}
           queries={RootQuery} />
    <IndexRoute component={Home} 
           queries={RootQuery}/>
    <Route path='*' component={NoMatch} />
  </Route>
)

  /*

renderLoading={() => <HomeComponent isLoading={true} /> }
*/
