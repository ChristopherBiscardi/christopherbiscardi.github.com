import React, { Component, PropTypes } from 'react';
const { bool, string } = PropTypes;
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import { Link } from 'react-router-dom';
import styles from './PostCard.css';

class PostCard extends Component {
  static fragments = {
    post: gql`
      fragment PostFragment on BlogPost {
        body
        attributes {
          title
          slug
          url
          excerpt
          updatedAt
          timeToRead
          headerImage
        }
      }
    `,
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
        <div>
          <Link to={url}><h4 className={styles.heading}>{title}</h4></Link>
          <span className={styles.meta}>{updatedAt} &bull; {timeToRead} minute read </span>
        </div>
        <p className={styles.excerpt}>{excerpt}</p>
        <Link to={url} className={styles.readMore}>Read more...</Link>
      </div>
    )
  }
}

PostCard.propTypes = {
  post: propType(PostCard.fragments.post).isRequired
};

export default PostCard;
