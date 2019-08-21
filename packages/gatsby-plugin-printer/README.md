# gatsby-plugin-printer

Print images using React components. Useful for opengraph images, blog post headers, or generative art. Can be used as a base for other more specific plugins.

## Install

```sh
yarn add gatsby-plugin-printer
```

## Usage

### Configuration

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-printer`,
      options: {
        components: {
          twitter: {
            path: require.resolve("./printers/twitter.js")
          },
          blogPost: {
            path: require.resolve("./printers/blog-post.js")
          }
        }
      }
    }
  ]
};
```

### GraphQL Query

```graphql
query PrintQuery {
  print(text: "", componentPath: "./printers/twitter") {
    imagePath
  }
}
```

```graphql
query PrintQuery {
  print(text: "", component: "twitter") {
    imagePath
  }
}
```

### printImage

```js
const imagePath = printImage({
  componentPath: "",
  payload: {}
});
```
