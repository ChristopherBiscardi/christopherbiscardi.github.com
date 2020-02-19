const fetch = require("node-fetch");
const path = require("path");
const slugify = require("@sindresorhus/slugify");
const fs = require(`fs`);
const toJsx = require("./mdxast-to-jsx");
const mkdirp = require("mkdirp");

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, reporter, store },
  options
) => {
  const siteDir = store.getState().program.directory;
  const { createNode } = actions;

  if (!options.workspace) {
    reporter.error(
      "gatsby-source-sector requires a `workspace` key in the gatsby-config options"
    );
    return;
  }
  mkdirp.sync(path.resolve(siteDir, "./.cache-sector"));

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
  console.log(data, etc);
  const { allMdx } = data.workspace;

  console.log("augmenting");
  const augmentedMdx = await Promise.all(
    allMdx.map(async ({ id, content, ...rest }) => {
      console.log(rest);
      let jsx;
      try {
        const jsx = await toJsx(content);
      } catch (e) {
        console.log(e);
        console.log("failed to process", rest);
        console.log(content);
        throw e;
      }
      const componentPath = path.resolve(siteDir, `./.cache-sector/${id}.js`);
      fs.writeFileSync(
        componentPath,
        `/** @jsx mdx */
import {mdx} from '@mdx-js/react';
${jsx}`
      );

      return {
        id,
        content,
        ...rest,
        component: componentPath
      };
    })
  );
  console.log("sugmented");
  augmentedMdx.forEach(sectorNode => {
    if (!sectorNode.slug && sectorNode.title) {
      sectorNode.slug = slugify(sectorNode.title);
    }
    const node = {
      id: createNodeId(`sector-${sectorNode.id}`),
      ...sectorNode,
      parent: null,
      children: [],
      internal: {
        type: `SectorMdx`,
        mediaType: `sector/mdx`,
        // content: nodeContent,
        contentDigest: createContentDigest(JSON.stringify(sectorNode))
      }
    };
    createNode(node);
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
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
            context: {
              mdxId: id
            }
          });
        }
      )
    );
  });
};
