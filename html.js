import React, { Component } from 'react';

export default class HTML extends Component {

  render() {
    const {
      bundleAssets,
      helmet
    } = this.props;

    return (
      <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        <link rel="stylesheet" type="text/css" href={`/${bundleAssets.css}`}/>
      </head>
      <body className="landing-page">
        <div id="react-mount" dangerouslySetInnerHTML={{__html: this.props.body}} />
      {/* Temporarily remove the client JS
        <script src={`/${bundleAssets.js}`} />
      */}
        <script dangerouslySetInnerHTML={{__html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
          ga('create', 'UA-46878058-1', 'auto');
          ga('send', 'pageview');`}}/>
      </body>
      </html>
    )
  }
}
