import React, { Component, PropTypes } from 'react';
const debug = require('debug')('html');

export default class Html extends Component {
  static propTypes = {
    body: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  };
  render() {
    const {
      bundleAssets,
      data,
      body,
      // glamor css and ids
      css,
      ids,
    } = this.props;
    console.log('glamor', glamor);
    return <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" type="text/css" href={`/${bundleAssets.static.css}`}/>
      </head>
      <body>
        not used
      </body>
    </html>
  }
}
