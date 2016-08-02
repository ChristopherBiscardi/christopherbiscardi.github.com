import React, { Component, PropTypes } from 'react';
const { bool, string } = PropTypes;
import { Link } from 'react-router';
import Relay from 'react-relay';
import Helmet from 'react-helmet';

import Hero from '../Hero';
import styles from './Post.css';

class PostComponent extends Component {
  render() {
    const {
      date,
      timeToRead,
      title,
      updatedAt,
      publishedAt,
      headerImage,
      canonicalURL,
      url
    } = this.props.root.post.attributes;

    return (
      <div>
        <Helmet
            title={title}
            meta={[
              {
                property: "og-title",
                content: title
              }, {
                property: "og-type",
                content: "article"
              }, {
                property: "og-url",
                content: __DOMAIN__ + (canonicalURL || url)
              }
            ]}
        />
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
            <div dangerouslySetInnerHTML={{ __html: this.props.root.post.body }} />
          </div>
        </div>
      </div>
    )
  }
}

export default Relay.createContainer(PostComponent, {
 initialVariables: { slug: null },
 fragments: {
   root: () =>  Relay.QL`fragment on Query {
     post(slug: $slug) {
       attributes {
         title,
         updatedAt,
         publishedAt,
         timeToRead,
         headerImage,
         url
         canonicalURL
       }
       body
     }
   }`
 },
});
