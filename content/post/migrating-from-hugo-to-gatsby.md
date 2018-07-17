---
title: "Migrating From Hugo to Gatsby"
date: 2017-11-24
tags: [gatsby,static,hugo]
draft: true
---

Awhile ago I wrote a prototype [static site generator][leo] that would
eventually inform gatsby's 1.0 rewrite. I switched to Hugo because I was taking
too much time customizing the site and not enough time blogging. Now having
gotten into a bit of a blogging pace again, I'm ready to go back towards a
solution that uses the same tech I use when I build applications and other UI.

# Requirements

I have to port from Hugo, which isn't a big deal since my usage of Hugo is
pretty light. It's mostly making sure the data is in the right place and the
frontmatter can be read. I also have some static images referenced from the
markdown files that I'd like to process before shipping as static.

The new system should support [preact][preact], [emotion][emotion],
[styled-system][styled-system], and basically anything else I use to build
modern sites like GraphQL, etc. The new system should also treat input content
as data rather than files. This was the core idea behind [LEO][leo] and it
turned out to be very powerful.

The options for that set of requirements isn't very big. It's basically
[gatsby][gatsby] or go back to my own custom [static site generator][leo]. n

# Picking a Starter

I settled on the [gatsby-themes][starter] starter because it was the closest to
what I wanted technology wise. Hopefully that will cut down some of my setup
time.

# Data location

hugo stores data in `^content/{content-type}` of which I have two. The important
one is `post` and the less interesting one is `review`.

## Getting Started

The first thing to do is to clone the starter into a sub-directory of my current
blog. We're going to delete the folder eventually, bringing everything up to the
top level at the end of this exploration.

```shell
gatsby new my-project https://github.com/saschajullmann/gatsby-starter-gatsbythemes
```

I didn't create a new branch because I have a bunch of un-committed blog posts
in the area and I don't want to have to sync the data directories while I'm
building out the new site just to publish a post.

We have to make some changes to the data directories in `gatsby-config.js`.

```javascript
module.exports = {
  siteMetadata: {
    title: "My Gatsby Site"
  },
  mapping: {
    "MarkdownRemark.frontmatter.author": "AuthorsYaml"
  },
  plugins: [
    // Adding various source folders to the GraphQL layer.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/../content/post/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images/`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: ``
      }
    },
    "gatsby-transformer-remark",
    "gatsby-transformer-json",
    "gatsby-transformer-yaml",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-offline",
    "gatsby-plugin-emotion",
    "gatsby-plugin-react-next"
  ]
};
```

I immediately ran into some issues that looked like this:

```
GraphQL Error Unknown field `allContentJson` on type `RootQueryType`

  file: /github/christopherbiscardi/christopherbiscardi.github.com/my-project/src/pages/index.js

   1 |
   2 |   query contentQuery {
>  3 |     allContentJson {
     |     ^
   4 |       edges {
   5 |         node {
   6 |           index {
   7 |             title
   8 |             subtitle
   9 |           }
  10 |         }
  11 |       }
  12 |     }
  13 |   }
```

I've never touched this scaffold before but I'll take my experience with LEO and
guess that this is a data pipeline issue, probably due to a malfunctioning
plugin.

# Swapping Tracks

With this knowledge and the fact that I have to make a bunch of changes anyway,
I'm going to swap to a basic starter and build up from scratch.

```shell
gatsby new newsite
```

Our new `gatsby-config.js` is much smaller:

```js
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`
  },
  plugins: [`gatsby-plugin-react-helmet`]
};
```

I'm going to add plugins one by one to make sure nothing breaks. First up,
`gatsby-plugin-preact`.

Reading the source tells us some interesting tidbits about what happens when we
apply the plugin. For example, we're locked into using `preact-compat` and using
`react-dom/server` on the development server. Something also seems to require
`create-react-class`. All of this together means we aren't getting the absolute
maximum out of preact, but we're still doing better than React in terms of
filesize.

```js
exports.modifyWebpackConfig = ({ config, stage }) => {
  // Requiring the server version of React-dom is hardcoded right now
  // in the development server. So we'll just avoid loading Preact there
  // for now.
  if (stage !== `develop-html`) {
    config._config.resolve.alias = {
      react: `preact-compat`,
      "react-dom": `preact-compat`,
      "create-react-class": `preact-compat/lib/create-react-class`
    };
  }

  return config;
};
```

The plugin architecture for is interesting but makes things a bit harder to work
with if you already know how to server render, set up routers, etc. As another
example we can check `gatsby-plugin-emotion`. Instead of swapping out entire
webpack entry points, gatsby exposes some APIs that allow you to write chunks of
entry points.

```js
exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents
}) => {
  const { html, ids, css } = extractCritical(renderToString(bodyComponent));

  const criticalStyle = <style dangerouslySetInnerHTML={{ __html: css }} />;
  const criticalIds = (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__EMOTION_CRITICAL_CSS_IDS__ = ${JSON.stringify(ids)};`
      }}
    />
  );

  setHeadComponents([criticalIds, criticalStyle]);
  replaceBodyHTMLString(html);
};
```

I tried to downplay this kind of plugin-ish architecture (even through it's hard
to when the core building block is webpack.

[preact]: https://preactjs.com/
[emotion]: https://emotion.sh/
[styled-system]: https://github.com/jxnblk/styled-system
[leo]: https://github.com/superawesomelabs/leo
[gatsby]: https://www.gatsbyjs.org/
[starter]: https://github.com/saschajullmann/gatsby-starter-gatsbythemes
