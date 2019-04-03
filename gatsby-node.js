const crypto = require("crypto");
const path = require(`path`);
const slugify = require("@sindresorhus/slugify");
const fs = require("fs");
const { findOne, findManyPaginated } = require("gatsby/dist/schema/resolvers");
const { GraphQLDate } = require("gatsby/dist/schema/types/date");
const { getPagination } = require(`gatsby/dist/schema/types/pagination`);
const { getSortInput } = require(`gatsby/dist/schema/types/sort`);
const { getFilterInput } = require(`gatsby/dist/schema/types/filter`);

const { SchemaComposer, InterfaceTypeComposer } = require("graphql-compose");

const basicResolve = field => (source, args, context, info) => {
  return source[field];
};

exports.sourceNodes = ({ actions: { createTypes }, schema }) => {
  const schemaComposer = new SchemaComposer();
  schemaComposer.addAsComposer(GraphQLDate);
  const blogPostIFTC = InterfaceTypeComposer.createTemp(
    `
    interface BlogPost @NodeInterface {
      id: ID!
      title: String!
excerpt: String!
      body: String!
      url: String!
      tags: [String]!
      date: Date!
      egghead: String
      isNewsletter: Boolean!
      webmentionMatchURL: String!
    }
  `,
    schemaComposer
  );

  const sortInputTC = getSortInput({
    schemaComposer,
    typeComposer: blogPostIFTC
  });
  sortInputTC.setTypeName("BlogPostReallyNotSort");
  const filterInputTC = getFilterInput({
    schemaComposer,
    typeComposer: blogPostIFTC
  });
  filterInputTC.setTypeName(`BlogPostReallyNotFilter`);
  const paginationTC = getPagination({
    schemaComposer,
    typeComposer: blogPostIFTC
  });

  createTypes([
    schemaComposer.getAnyTC("SortOrderEnum").getType(),
    schemaComposer.getAnyTC("StringQueryOperatorInput").getType(),
    schemaComposer.getAnyTC("DateQueryOperatorInput").getType(),
    schemaComposer.getAnyTC("BooleanQueryOperatorInput").getType(),
    schemaComposer.getAnyTC("PageInfo").getType(),
    blogPostIFTC.getType(),
    sortInputTC.getType(),
    filterInputTC.getType(),
    paginationTC.getType()
  ]);

  createTypes(
    schema.buildObjectType({
      name: `MdxBlogPost`,
      args: {
        filter: "BlogPostReallyNotFilter"
      },
      fields: {
        id: { type: `ID!` },
        title: {
          type: "String!"
        },
        excerpt: {
          type: "String!",
          resolve: async (source, args, context, info) => {
            const type = info.schema.getType(`Mdx`);
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent
            });
            const resolver = type.getFields()["excerpt"].resolve;
            const excerpt = await resolver(
              mdxNode,
              { pruneLength: 140 },
              context,
              {
                fieldName: "excerpt"
              }
            );
            return excerpt;
          }
        },
        body: {
          type: "String!",
          resolve(source, args, context, info) {
            const type = info.schema.getType(`MDXCodeMdx`);
            const mdxNode = context.nodeModel.getNodeById({
              id: source.parent
            });
            const resolver = type.getFields()["body"].resolve;
            return resolver(mdxNode, {}, context, {
              fieldName: "body"
            });
          }
        },
        url: {
          type: "String!"
        },
        tags: { type: `[String]!` },
        date: {
          type: "Date!"
        },
        egghead: {
          type: "String"
        },
        isNewsletter: {
          type: "Boolean!"
        },
        webmentionMatchURL: { type: "String!" }
      },
      interfaces: [`Node`, `BlogPost`]
    })
  );
};

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Query: {
      // Create a new root query field.
      allBlogPost: {
        type: `BlogPostConnection`,
        args: {
          filter: "BlogPostReallyNotFilter",
          sort: "BlogPostReallyNotSort",
          skip: `Int`,
          limit: `Int`
        },
        resolve: (source, args, context, info) =>
          findManyPaginated("MdxBlogPost")({ source, args, context, info })
      },
      blogPost: {
        type: `BlogPost`,
        args: {
          // would be nice to not have to specify this for every field
          id: `StringQueryOperatorInput`
        },
        resolve: (source, args, context, info) =>
          findOne("MdxBlogPost")({ source, args, context, info })
      }
    }
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allBlogPost {
              byTag: group(field: tags) {
                fieldValue
              }
              edges {
                node {
                  id
                  body
                  tags
                  title
                  url
                  webmentionMatchURL
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

        result.data.allBlogPost.byTag.forEach(({ fieldValue }) => {
          createPage({
            path: `/tags/${fieldValue}`,
            component: require.resolve("./src/content-by-tag"),
            context: {
              tag: fieldValue
            }
          });
        });
        // Create blog posts pages.
        result.data.allBlogPost.edges.forEach(({ node }) => {
          const { title, url, id, parent, fields, webmentionMatchURL } = node;
          createPage({
            path: url,
            component: require.resolve("./src/blog-post"),
            context: {
              id: id,
              title: title,
              webmentionMatchURL: webmentionMatchURL
            }
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
          test: /\.js$/,
          include: /@sens8/,
          use: [loaders.js()]
        }
      ]
    }
  });
};

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  const { createNodeField, createNode, createParentChildLink } = actions;

  if (node.internal.type === `Mdx`) {
    const { frontmatter } = node;
    const parent = getNode(node.parent);

    const url =
      frontmatter.url ||
      `/post/${frontmatter.slug ||
        slugify(frontmatter.title) ||
        slugify(parent.name)}`;

    if (parent.internal.type === "File") {
      const ext = path.extname(parent.absolutePath);
      const featuredImage = parent.absolutePath.replace(ext, ".png");
      if (fs.existsSync(featuredImage)) {
        createNodeField({
          name: `featuredImage`,
          node,
          value: featuredImage
        });
      }

      createNodeField({
        name: `sourceInstanceName`,
        node,
        value: parent.sourceInstanceName
      });
    }

    // create MdxBlogPost

    if (parent.sourceInstanceName === "posts") {
      const fieldData = {
        title: node.frontmatter.title,
        url: url,
        date: node.frontmatter.date,
        tags: node.frontmatter.tags || [],
        egghead: node.frontmatter.egghead,
        isNewsletter: !!node.frontmatter.isNewsletter,
        webmentionMatchURL: `https://www.christopherbiscardi.com${url}/`
      };

      createNode({
        ...fieldData,
        // Required fields.
        id: createNodeId(`${node.id} >>> MdxBlogPost`),
        parent: node.id,
        children: [],
        internal: {
          type: `MdxBlogPost`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(fieldData))
            .digest(`hex`),
          content: JSON.stringify(fieldData),
          description: `Satisfies the BlogPost interface for Mdx`
        }
      });
      createParentChildLink({ parent: parent, child: node });
    }
  }
};
