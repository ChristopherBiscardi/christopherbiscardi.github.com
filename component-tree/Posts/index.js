import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import styles from './Posts.css';
import PostCard from '../../components/PostCard';

class PostsPage extends Component {
  render() {
    const { edges } = this.props.root.posts
    return (
      <ul className={styles.container}>
      {
        edges.map(({ node }) => {
          return (
            <li className={styles.li}
                key={node.attributes.slug}
            >
              <PostCard post={node}/>
            </li>
          )
        })
      }
      </ul>
    )
  }
}

export default Relay.createContainer(PostsPage, {
  fragments: {
    root: () => Relay.QL`
      fragment on Query {
        posts(first: 50) {
          pageInfo { hasNextPage }
          edges {
            node {
              attributes {
                slug,
              }
              ${PostCard.getFragment('post')}
            }
          }
      }
    }`
  }
});
