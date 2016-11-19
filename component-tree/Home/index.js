import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Hero from '../Hero';
import PostCard from '../../components/PostCard';
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

export class HomeComponent extends Component {

  render() {
    const {
      root,
      loading
    } = this.props.data;
    if(loading) {
      return <div>HomeLoading</div>
    }
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
        { root.sticky && <StickyComponent sticky={root.sticky}/> }
        <div className={styles.postsWrapper}>
          <div className={styles.posts}>
          {
            root.posts && root.posts.edges.map( ({ node }) => (
              // lost-column div size here
              <div
                className={styles.post}
                key={node.attributes.slug}
              >
                <PostCard post={node} />
              </div>
            ))
          }
          </div>
        </div>
      </div>
    )
  }
}

const Query = gql`query HomeQuery {
  root {
    posts(first: 5) {
      pageInfo { hasNextPage }
      edges {
        node {
          ...PostFragment
        }
      }
    }
    sticky: post(slug: "building-a-docker-registry") {
      attributes { title, url, excerpt }
    }
  }
}`

export default graphql(Query, {
  options: ({ params }) => {
    return {
      fragments: PostCard.fragments.post.fragments(),
      variables: {}
    }
  },
})(HomeComponent);
