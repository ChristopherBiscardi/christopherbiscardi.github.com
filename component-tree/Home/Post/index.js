import React, { Component, PropTypes } from 'react';
const { bool, string } = PropTypes;
import Relay from 'react-relay';
import { Link } from 'react-router';
import styles from './Post.css';

class Post extends Component {
  static propTypes = {
    title: string
  };
  render() {
    const {
      title,
      updatedAt,
      excerpt,
      featuredImage,
      timeToRead,
      url,
      headerImage
    } = this.props.post.attributes;

    var maybeHeaderImage = <div className={styles.blueprintHeader}></div>;
    if(headerImage) {
      maybeHeaderImage = (
        <div className={styles.imageHeader}
             style={{backgroundImage: `url(${headerImage})`}}></div>
      );
    }

    return (
      <div className={styles.post}>
        {maybeHeaderImage}
        <Link to={url}><h4 className={styles.heading}>{title}</h4></Link>
        <span className={styles.meta}>{updatedAt} &bull; {timeToRead} minute read </span>
        <p className={styles.excerpt}>{excerpt}</p>
        <Link to={url} className={styles.readMore}>Read more...</Link>
      </div>
    )
  }
}

export default Relay.createContainer(Post, {
  fragments: {
    post: () => Relay.QL`
      fragment on BlogPost {
        attributes {
          title
          slug
          url
          excerpt
          updatedAt
          timeToRead
          headerImage
        }
    }`
  }
});
