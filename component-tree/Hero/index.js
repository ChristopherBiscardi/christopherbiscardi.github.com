import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Hero.css';

export default class Hero extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.upper}>
          <h1>Chris Biscardi</h1>
          <p>Haskell, React, Design, Products</p>
        </div>
      </div>
    )
  }
}
