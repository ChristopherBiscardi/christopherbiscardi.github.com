import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Nav.css';

export default class Nav extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <div className={styles.logoWrapper}>
          <img className={styles.logo}
               src={require('./cb-logo-2014.png')} />
       </div>
        <ul className={styles.items}>
          <li><Link to='/posts'
                    className={styles.itemLink}
                    activeClassName={styles.active}>Posts</Link></li>
          <li><Link to='/talks'
                    className={styles.itemLink}
                    activeClassName={styles.active}>Talks</Link></li>
          <li><Link to='/books'
                    className={styles.itemLink}
                    activeClassName={styles.active}>Books</Link></li>
          <li><Link to='/projects'
                    className={styles.itemLink}
                    activeClassName={styles.active}>Projects</Link></li>
        </ul>
      </nav>
      </div>
    )
  }
}
