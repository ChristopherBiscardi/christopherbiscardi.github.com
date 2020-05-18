const fetch = require("node-fetch");
const slugify = require("@sindresorhus/slugify");
const toJsx = require("./mdxast-to-jsx");
const rehypePrism = require("rehype-prism-mdx");
const rehypeSlug = require("rehype-slug");
const rehypeLink = require("rehype-autolink-headings");

exports.sourceNodes = async ({ workspace, createPage, ...options }) => {
  if (!workspace) {
    console.error(
      "fetch-sector-docs requires a `workspace` key in the options"
    );
    return;
  }

  const { data, ...etc } = await fetch(`https://api.sector.dev/graphql`, {
    method: "post",
    body: JSON.stringify({
      query: `{
        workspace(id: "${workspace}") {
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
    .catch(e => console.log(e));
  if (!data) {
    throw new Error(
      "Sector was unable to fetch data, is your secret key correct?"
    );
  }
  const { allMdx } = data.workspace;

  return Promise.all(
    allMdx.map(async ({ id, content, ...rest }) => {
      let slug;
      if (!rest.slug && rest.title) {
        slug = slugify(rest.title);
      }
      let jsx;
      try {
        jsx = await toJsx(content, {
          rehypePlugins: [rehypePrism, rehypeSlug, rehypeLink]
        });
      } catch (e) {
        console.log(e);
        console.log("failed to process", rest);
        console.log(content);
        throw e;
      }

      const paths = await createPage({
        module: `/** @jsx mdx */
        import {mdx} from '@mdx-js/preact';
        ${jsx}`,
        slug,
        data: { ...rest }
      });
      const createdAt = new Date(parseInt(rest.createdAt)).toISOString();
      const updatedAt = new Date(parseInt(rest.updatedAt)).toISOString();

      // writeDataFile
      return {
        id,
        content,
        slug,
        ...rest,
        createdAt,
        updatedAt,
        ...paths
      };
    })
  );
};
