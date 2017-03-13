import React, { Component, PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import styles from './Posts.css';
import PostCard from '../../components/PostCard';

class PostsPage extends Component {
  render() {
    const { root, loading } = this.props.data;
    if(loading) {
      return <h1>Loading</h1>;
    }
    return (
      <ul className={styles.container}>
      {
        root.posts && root.posts.edges.map(({ node }) => {
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

const Query = gql`query PostsQuery {
      root {
        posts(first: 50) {
          pageInfo { hasNextPage }
          edges {
            node {
              attributes {
                slug,
              }
              ...PostFragment
            }
          }
      }
    }
}
${PostCard.fragments.post}
`

export default graphql(Query, {
  options: ({ params }) => ({
    variables: {}
  }),
})(PostsPage)
