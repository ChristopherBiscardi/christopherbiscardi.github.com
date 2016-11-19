import React, { Component, PropTypes } from 'react';
const { bool, string } = PropTypes;
import { Link } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Fragment from 'graphql-fragments';
import Helmet from 'react-helmet';

import Hero from '../Hero';
import styles from './Post.css';

class PostComponent extends Component {
  static fragments = {
    post: new Fragment(gql`
      fragment PostFragment on BlogPost {
        body
        attributes {
          title
          updatedAt
          publishedAt
          timeToRead
          headerImage
          url
          canonicalURL
          excerpt
        }
      }
      `)
  }
  renderLoading() {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.singleColumn}>
            <h1 className={styles.titleEmpty}>                 </h1>
            <div className={styles.metaEmpty}>               </div>
          </div>
        </div>
          <img className={styles.imgEmpty} />
            <div className={styles.container}>
              <div className={styles.singleColumn}>
              </div>
            </div>
      </div>
    )
  }
  render() {
    const { loading, root } = this.props.data;
    if(loading) {
      return this.renderLoading();
    }
    const {
      timeToRead,
      title,
      updatedAt,
      publishedAt,
      headerImage,
      canonicalURL,
      url,
      excerpt
    } = root.post.attributes;

    return (
      <div className={styles.page}>
        { this.renderHelmet() }
        <div className={styles.container}>
          <div className={styles.singleColumn}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.meta}>{updatedAt} &middot; {timeToRead} minute read</div>
          </div>
        </div>
        {
          headerImage ? (
            <img className={styles.img} src={headerImage} />
          ) : null
        }
        <div className={styles.container}>
          <div className={styles.singleColumn}>
            <div dangerouslySetInnerHTML={{ __html: root.post.body }} />
          </div>
        </div>
      </div>
    )
  }
  renderHelmet() {
    const {
      title,
      updatedAt,
      publishedAt,
      headerImage,
      canonicalURL,
      url,
      excerpt
    } = this.props.data.root.post.attributes;

    return (
      <Helmet
          title={title}
          meta={[
            {
              property: "description",
              content: excerpt && excerpt.slice(0,155)
            }, {
              property: "og:title",
              content: title
            }, {
              property: "og:type",
              content: "article"
            }, {
              property: "og:url",
              content: __DOMAIN__ + (canonicalURL || url)
            }, {
              property: "og:description",
              content: excerpt
            }, {
              property: "og:image",
              content: __DOMAIN__ + headerImage
            }, {
              property: "twitter:card",
              content: "summary"
            }, {
              property: "twitter:title",
              content: title.slice(0,70)
            }, {
              property: "twitter:description",
              content: excerpt && excerpt.slice(0,200)
            }, {
              property: "twitter:url",
              content: __DOMAIN__ + (canonicalURL || url)
            }, /* TODO: enable this after image-plugin resize work
                  {
                  property: "twitter:image",
                  content: __DOMAIN__ + twitterImage
                  }
                */
          ]}
      />
    )
  }
}

const Query = gql`query PostQuery($slug: String!) {
  root {
    post(slug: $slug) {
      ...PostFragment
    }
  }
}`

export default graphql(Query, {
  options: ({ params }) => {
    return {
      fragments: PostComponent.fragments.post.fragments(),
      variables: { slug: params.slug },
    }
  },
})(PostComponent);
