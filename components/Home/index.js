import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import Hero from '../Hero';
import styles from './Home.css';

const { bool, string } = PropTypes;

/**
 * nothing, loading, none, one, some, too many, incorrect, correct, done
 */

class Post extends Component {
  static propTypes = {
    title: string
  };
  render() {
    const {
      title, date, excerpt, featuredImage, timeToRead, url
    } = this.props.post.attributes;
    return (
      <div className={styles.post}>
        <div className={styles.image}></div>
        <Link to={url}><h4 className={styles.heading}>{title}</h4></Link>
        <span className={styles.meta}>{date} &bull; {timeToRead} min read</span>
        <p className={styles.excerpt}>{excerpt}</p>
        <Link to={url} className={styles.readMore}>Read more...</Link>
      </div>
    )
  }
}

const PostContainer = Relay.createContainer(Post, {
  fragments: {
    post: () => Relay.QL`
      fragment on BlogPost {
        attributes { title, slug, url, excerpt, date, timeToRead }
    }`
  }
});

export class HomeComponent extends Component {
  static propTypes = {
    isLoading: bool
  };

  render() {
    console.log('HC', this.props.root.posts.edges);
    const {
      isLoading,
      root
    } = this.props;

    return (
      <div>
        <Hero />
        <div className={styles.postsWrapper}>
          <div className={styles.posts}>
          {
            root.posts.edges.map( ({ node }) => (
              <PostContainer key={node.attributes.slug} post={node} />
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
              ${ PostContainer.getFragment('post') }
              attributes { slug }
            }
          }
      }
    }`
  }
});
