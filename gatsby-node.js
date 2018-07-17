const path = require(`path`);
const fs = require("fs");
const frontmatter = require("front-matter");
const slugify = require("slugify");
const mdx = require("@mdx-js/mdx");
const _eval = require("eval");
const transform = require("babel-core").transform;
const React = require("react");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    const blogPost = path.resolve(`./src/blog-post.js`);
    resolve(
      graphql(
        `
          {
            allFile {
              edges {
                node {
                  absolutePath
                  extension
                  dir
                  modifiedTime
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create blog posts pages.
        result.data.allFile.edges.forEach(edge => {
          const file = fs.readFileSync(edge.node.absolutePath, "utf-8");
          const fm = frontmatter(file).attributes;
          const newFileContents = `

export default ({children}) => <Post some='metadata' >{children}</Post>


${file}`;
          const code = transform(
            `import React from 'react';
            import {MDXTag} from '@mdx-js/tag';
            import Post from '../src/blog-post'

            ${mdx.sync(newFileContents)}
            `,
            {
              presets: [
                "@babel/preset-env",
                require.resolve("@babel/preset-react")
              ]
            }
          ).code;

          const newFilePath =
            __dirname +
            "/my-tmp/" +
            slugify(fm.title, {
              lower: true,
              remove: /[$*_+~.()'"!\-:@\/]/g
            }) +
            ".js";
          fs.writeFileSync(newFilePath, code);
          createPage({
            path: fm.url || `/post/${slugify(fm.title.toLowerCase())}`,
            component: require.resolve(newFilePath), //blogPost,
            context: { absPath: edge.node.absolutePath }
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.mdx?$/,
          use: ["babel-loader", "@mdx-js/loader"]
        }
      ]
    },
    plugins: [
      plugins.define({
        __DEVELOPMENT__: stage === `develop` || stage === `develop-html`
      })
    ]
  });
};
