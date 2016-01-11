import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Nav.css';

export default class Nav extends Component {
  render() {
    return (
      <nav>
        <ul className={styles.items}>
          <li><Link to='/posts'>Posts</Link></li>
          <li><Link to='/talks'>Talks</Link></li>
          <li><Link to='/books'>Books</Link></li>
          <li><Link to='/projects'>Projects</Link></li>
        </ul>
      </nav>
    )
  }
}
