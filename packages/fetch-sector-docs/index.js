const fetch = require("node-fetch");
const path = require("path");
const slugify = require("@sindresorhus/slugify");
const fs = require(`fs`);
const toJsx = require("./mdxast-to-jsx");
const mkdirp = require("mkdirp");

exports.sourceNodes = async options => {
  const siteDir = process.cwd();

  if (!options.workspace) {
    console.error(
      "gatsby-source-sector requires a `workspace` key in the gatsby-config options"
    );
    return;
  }
  mkdirp.sync(path.resolve(siteDir, "src/pages"));

  const { data, ...etc } = await fetch(`https://api.sector.dev/graphql`, {
    method: "post",
    body: JSON.stringify({
      query: `{
        workspace(id: "${options.workspace}") {
            id
            allMdx {
                id
                title
                content
                contentType
                updatedAt
                createdAt
            }
        }
      }`
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SECTOR_TOKEN}`
    }
  })
    .then(res => res.json())
    .catch(body => console.log(JSON.stringify(body, null, 2)));

  const { allMdx } = data.workspace;

  return Promise.all(
    allMdx.map(async ({ id, content, ...rest }) => {
      let slug;
      if (!rest.slug && rest.title) {
        slug = slugify(rest.title);
      }
      let jsx;
      try {
        jsx = await toJsx(content);
      } catch (e) {
        console.log(e);
        console.log("failed to process", rest);
        console.log(content);
        throw e;
      }
      const componentPath = path.resolve(siteDir, `./src/pages/${slug}.js`);

      return {
        id,
        content: `/** @jsx mdx */
        import {mdx} from '@mdx-js/preact';
        ${jsx}`,
        slug,
        ...rest,
        component: componentPath
      };
    })
  );
};

exports.createPages = async ({ createPage }) => {
  return graphql(
    `
      query loadSectorMdxPagesQuery {
        allSectorMdx {
          nodes {
            id
            contentType
            component
            slug
            createdAt
          }
        }
      }
    `
  ).then(async result => {
    if (result.errors) {
      throw result.errors;
    }
    return Promise.all(
      result.data.allSectorMdx.nodes.map(
        async ({ id, contentType, createdAt, component, slug }) => {
          return createPage({
            // Path for this page — required
            path: contentType ? `/post/${slug}` : `/notes/${slug}`,
            component,
            context: {}
          });
        }
      )
    );
  });
};
