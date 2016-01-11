/**
 * Normalize styles are first, so they end up first in the stylesheet
 */
import 'normalize.css';
import 'normalize-opentype.css/normalize-opentype.css';
import React, { Component } from 'react';
import Relay from 'react-relay';
import Nav from './components/Nav';
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

class HomeComponent extends Component {
  render() {
    return (
      <div>
        <h2><a href='/docker-machine'>Docker Machine</a></h2>
      </div>
    )
  }
}

class PostComponent extends Component {
  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.props.post.body }}>
      </div>
    )
  }
}
const Post = Relay.createContainer(PostComponent, {
 fragments: {
   post: () => Relay.QL`fragment on BlogPost {
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
    return (
      <div>404</div>
    )
  }
}

export default [{
  path: '/',
  component: App,
  indexRoute: {
    component: HomeComponent
  },
  childRoutes: [{
    path: '/posts',
    component: PostsPage
  },{
    path: ':slug',
    component: Post,
    queries: {
    post: (Component) => Relay.QL`
                query PostQuery {
                  post(slug: $slug) {
                    ${ Component.getFragment('post') }
                  }
                }
              `
    }
  },{
    path: '*',
    component: NoMatch
  }, ],
}];
// (
//     <Route path="/" component={App}>
//       <IndexRoute component={Home}
//                   queries={HomeQueries} />
//       <Route path="*" component={NoMatch}/>
//     </Route>
// )
