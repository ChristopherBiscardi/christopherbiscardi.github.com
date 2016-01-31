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
    } = this.props;
    console.log('Post', this.props)
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
export class HomeComponent extends Component {
  static propTypes = {
    isLoading: bool
  };
  static defaultProps = {
    blogposts: {
      allPosts: []
    }
  };

  render() {
//    console.log(this.props);
    const {
      isLoading,
      blogposts
    } = this.props;

    return (
      <div>
      <Hero />
      <div className={styles.postsWrapper}>
      <div className={styles.posts}>
      {
        blogposts.allPosts && blogposts.allPosts.map( post => (
          <Post key={post.attributes.slug} {...post} {...post.attributes} isLoading={isLoading} />
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
    blogposts: () => Relay.QL`fragment on Query {
                    allPosts(limit: 5) {
                      attributes { title, slug, url, excerpt, date, timeToRead }
                    }
    }`
  }
})

export const queries = {
  blogposts: (Component) => Relay.QL`
                query HomeQuery {
                  root {
                    ${ Component.getFragment('blogposts') }
                  }
                }
              `
}
