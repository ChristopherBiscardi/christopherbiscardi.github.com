import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Nav.css';

export default class Nav extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <Link to='/' className={styles.logoWrapper}>
          <img className={styles.logo}
               src={'/' + require('./cb-logo-2014.png')} />
       </Link>
        <ul className={styles.items}>
          <li><Link to='/posts'
                    className={styles.itemLink}
                    activeClassName={styles.active}>Posts</Link></li>
          <li><a href='https://github.com/ChristopherBiscardi/ama'
                 className={styles.itemLink}>AMA</a></li>
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
