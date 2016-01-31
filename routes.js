/**
 * Normalize styles are first, so they end up first in the stylesheet
 */
import '@sa-labs/fate-core/core.css';
import 'normalize-opentype.css/normalize-opentype.css';
import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import Relay from 'react-relay';
import Nav from './components/Nav';
import Home, {
  queries as HomeQueries,
  HomeComponent
} from './components/Home';
import styles from './routes.css';

class App extends Component {
  render() {
    const {
      children,
      ...props
    } = this.props;
    return (
      <div>
        <Nav/>
        <div>{children}</div>
      </div>
    )
  }
}

class PostComponent extends Component {
  render() {
    console.log('postpage', this.props.params);
    return (
      <div dangerouslySetInnerHTML={{ __html: this.props.post.body }}>
      </div>
    )
  }
}
const Post = Relay.createContainer(PostComponent, {
 fragments: {
   post: () =>  Relay.QL`fragment on BlogPost {
    body
   }`
 },
});

class PostsPage extends Component {
  render() {
    return (
      <div>Posts Page</div>
    )
  }
}

class NoMatch extends Component {
  render() {
    console.log(this.props);
    return (
      <div>404</div>
    )
  }
}

const PostQueries = {
  post: (Component) => Relay.QL`
                query PostQuery {
                  post(slug: $slug) {
                    ${ Component.getFragment('post') }
                  }
                }
              `
}

export default (
  <Route path='/' component={App}>
    <Route path='/posts' component={PostsPage} />
    <Route path=':slug'
           component={Post}
           queries={PostQueries} />
    <Route path='/:year/:month/:day/:slug/'
           component={Post}
           queries={PostQueries} />
    <IndexRoute component={Home} 
                queries={HomeQueries}
                renderLoading={() => <HomeComponent isLoading={true} /> }/>
    <Route path='*' component={NoMatch} />
  </Route>
)
