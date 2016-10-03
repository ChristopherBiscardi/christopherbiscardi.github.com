import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import Hero from '../Hero';
import Post from '../../components/PostCard';
import styles from './Home.css';
const { bool, string } = PropTypes;
import Helmet from 'react-helmet';

class StickyComponent extends Component {
  render() {
    const {
      title, excerpt, url
    } = this.props.sticky.attributes
    return (
      <Link to={url}>
        <div className={styles.stickyWrapper}>
          <div className={styles.stickyInnerWrapper}>

            <div className={styles.stickyMeta}>
              <p className={styles.featured}>Featured</p>
            </div>

            <div className={styles.stickyContent}>
              <h3>{title}</h3>
              <p>{excerpt}</p>
              <p className={styles.readMore}>Read more...</p>
            </div>

          </div>
        </div>
      </Link>
    )
  }
}

const StickyContainer = Relay.createContainer(StickyComponent, {
  fragments: {
    sticky: () => Relay.QL`
      fragment on BlogPost {
          attributes { title, url, excerpt }
      }`
  }
});

export class HomeComponent extends Component {
  static propTypes = {
    isLoading: bool
  };

  render() {
    const {
      isLoading,
      root
    } = this.props;

    return (
      <div>
        <Helmet
            title="Chris Biscardi"
            meta={[
              {
                property: "og:url",
                content: __DOMAIN__
              }, {
                property: "og:description",
                content: "Chris Biscardi builds products for startups using functional programming."
              }, {
                property: "og:image",
                content: __DOMAIN__ + require('../Hero/default-bg.jpeg')
              },
            ]}
        />
        <Hero />
        <StickyContainer sticky={root.sticky}/>
        <div className={styles.postsWrapper}>
          <div className={styles.posts}>
          {
            root.posts && root.posts.edges.map( ({ node }) => (
              // lost-column div size here
              <div className={styles.post}
                   key={node.attributes.slug}
              >
                <Post post={node} />
              </div>
            ))
          }
        </div>
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(HomeComponent, {
  fragments: {
    root: () => Relay.QL`
      fragment on Query {
        posts(first: 5) {
          pageInfo { hasNextPage }
          edges {
            node {
              ${ Post.getFragment('post') }
              attributes { slug }
            }
          }
        }
        sticky: post(slug: "building-a-docker-registry") {
          ${ StickyContainer.getFragment('sticky') }
        }
    }`
  }
});
