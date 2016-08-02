import React, { Component } from 'react';
import Nav from '../components/Nav';
import Helmet from 'react-helmet';

export default class App extends Component {
  render() {
    const { children, ...props } = this.props;
    return (
      <div>
        <Nav/>
        <div>{children}</div>
      </div>
    )
  }
}
