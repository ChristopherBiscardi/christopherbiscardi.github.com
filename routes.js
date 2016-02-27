/**
 * Normalize styles are first, so they end up first in the stylesheet
 */
import '@sa-labs/fate-core/core.css';
import 'normalize-opentype.css/normalize-opentype.css';
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import Relay from 'react-relay';
import Nav from './components/Nav';
import Home from './components/Home';
import Post from './components/Post';
import Posts from './pages/Posts';
import styles from './routes.css';

class App extends Component {
  render() {
    const { children, ...props } = this.props;
    return (
      <div>
        <Nav/>
        <div>{children}</div>
      </div>
    )
  }
}

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
