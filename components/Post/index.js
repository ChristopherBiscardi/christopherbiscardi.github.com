import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Relay from 'react-relay';
import Hero from '../Hero';
import styles from './Post.css';

const { bool, string } = PropTypes;

class PostComponent extends Component {
  render() {
    const {
      date, timeToRead, title
      } = this.props.root.post.attributes;
    return (
      <div className={styles.container}>
        <div className={styles.singleColumn}>
          <div>{date} &middot; {timeToRead} minutes to read</div>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: this.props.root.post.body }} />
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
       attributes { title, date, timeToRead }
       body
     }
   }`
 },
});
