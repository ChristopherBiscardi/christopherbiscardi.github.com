import React, { Component, PropTypes } from 'react';
const { bool, string } = PropTypes;
import { Link } from 'react-router';
import Relay from 'react-relay';
import Helmet from 'react-helmet';
import headerImage from './header.jpg';

import Hero from '../Hero';
import styles from './About.css';

// Github Stats (# of Repos by language)
//
export default class AboutComponent extends Component {
  render() {
    return (
      <div>
        { this.renderHelmet() }
        <div className={styles.container}>
          <div className={styles.singleColumn}>
            <h1 className={styles.title}>title</h1>
            <div className={styles.meta}>updatedAt &middot; timeToRead minute read</div>
          </div>
        </div>
        <img className={styles.img} src={'/'+headerImage} />
        <div className={styles.container}>
          <div className={styles.singleColumn}>
          </div>
        </div>
      </div>
    )
  }
  renderHelmet() {

    const excerpt = 'Chris Biscardi is a';
    const title = 'Chris Biscardi';

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
              content: __DOMAIN__ + "/about"
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
              content: __DOMAIN__ + "/about"
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
