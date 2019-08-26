const crypto = require("crypto");
const path = require("path");
const mdx = require("@mdx-js/mdx");
const grayMatter = require("gray-matter");
const visit = require("unist-util-visit");

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  createTypes(`interface DevTip @nodeInterface {
      id: ID!
      title: String
      tweet: String
      codeBlocks: [String]!
      collection: DevTipsYaml! @link(by: "content")
      body: String!
  }`);

  createTypes(
    schema.buildObjectType({
      name: `MdxDevTip`,
      fields: {
        id: `ID!`,
        title: `String!`,
        tweet: "String",
        codeBlocks: "[String]!",
        collection: {
          type: "DevTipsYaml!",
          extensions: {
            link: { by: "content" }
          }
        },
        body: {
          type: "String!",
          resolve(source, args, context, info) {
            const type = info.schema.getType(`Mdx`);
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent
            });
            const resolver = type.getFields()["body"].resolve;
            return resolver(mdxNode, {}, context, {
              fieldName: "body"
            });
          }
        }
      },
      interfaces: [`Node`, `DevTip`]
    })
  );

  createTypes(`type DevTipsYaml implements Node {
      id: ID!
      name: String!
      slug: String!
      description: String
      content: String
  }`);
};

exports.onCreateNode = async ({ node, actions, getNode, createNodeId }) => {
  const { createNodeField, createNode, createParentChildLink } = actions;

  if (node.internal.type === `Mdx`) {
    const { frontmatter } = node;
    const parent = getNode(node.parent);

    const codeBlocks = [];

    await mdx(grayMatter(node.rawBody).content, {
      remarkPlugins: [
        () => ast => {
          visit(ast, "code", node => {
            codeBlocks.push(node.value);
          });
          return ast;
        }
      ]
    });
    if (node.frontmatter.tweet.length >= 200) {
      reporter.warn(
        `Tweet is too long by ${node.frontmatter.tweet.length - 200} chars: ${
          node.frontmatter.tweet
        }`
      );
    }

    if (parent.sourceInstanceName === "gatsby-theme-dev-tips") {
      const fieldData = {
        title: node.frontmatter.title,
        tweet: node.frontmatter.tweet,
        collection: `./${parent.relativeDirectory}`,
        codeBlocks
      };

      createNode({
        ...fieldData,
        // Required fields.
        id: createNodeId(`${node.id} >>> MdxDevTip`),
        parent: node.id,
        children: [],
        internal: {
          type: `MdxDevTip`,
          contentDigest: parent.internal.contentDigest,
          content: JSON.stringify(fieldData),
          description: `Satisfies the DevTip interface for Mdx`
        }
      });
      createParentChildLink({ parent: parent, child: node });
    }
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(
    `
      query LoadDevTips {
        allTipCollections: allDevTipsYaml {
          nodes {
            slug
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    createPage({
      path: `/devtips`,
      component: require.resolve(
        `./src/templates/dev-tip-collections-query.js`
      ),
      context: {}
    });

    // Create blog post pages.
    result.data.allTipCollections.nodes.forEach(({ slug }) => {
      createPage({
        path: `/devtips/${slug}`,
        component: require.resolve(
          `./src/templates/dev-tip-collection-query.js`
        ),
        context: {
          slug
        }
      });
    });
  });
};

exports.onPostBuild = async ({ graphql }, pluginOptions) => {};
