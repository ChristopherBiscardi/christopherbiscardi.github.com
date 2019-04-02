const crypto = require("crypto");
const path = require(`path`);
const slugify = require("@sindresorhus/slugify");
const fs = require("fs");
const { findManyPaginated } = require("gatsby/dist/schema/resolvers");
const { GraphQLDate } = require("gatsby/dist/schema/types/date");
const { getPagination } = require(`gatsby/dist/schema/types/pagination`);
const { getSortInput } = require(`gatsby/dist/schema/types/sort`);
const { getFilterInput } = require(`gatsby/dist/schema/types/filter`);

const { SchemaComposer, InterfaceTypeComposer } = require("graphql-compose");

exports.sourceNodes = ({ actions: { createTypes }, schema }) => {
  const schemaComposer = new SchemaComposer();
  schemaComposer.addAsComposer(GraphQLDate);
  const blogPostIFTC = InterfaceTypeComposer.createTemp(
    `
    interface BlogPost @NodeInterface {
      title: String!
      body: String!
      url: String
      tags: [String]
      date: Date!
      egghead: String
      isNewsletter: Boolean
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
      fields: {
        title: {
          type: "String!"
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
        date: {
          type: "Date!"
        },
        egghead: {
          type: "String"
        },
        isNewsletter: {
          type: "Boolean!"
        }
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
            allMdx(
              filter: { fields: { sourceInstanceName: { eq: "posts" } } }
            ) {
              byTag: group(field: frontmatter___tags) {
                fieldValue
              }
              edges {
                node {
                  id
                  fields {
                    slug
                    webmentionMatchURL
                  }
                  frontmatter {
                    slug
                    url
                    title
                    tags
                  }
                  parent {
                    ... on File {
                      name
                    }
                  }
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

        result.data.allMdx.byTag.forEach(({ fieldValue }) => {
          createPage({
            path: `/tags/${fieldValue}`,
            component: require.resolve("./src/content-by-tag"),
            context: {
              tag: fieldValue
            }
          });
        });
        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          const { frontmatter, parent, fields } = node;
          createPage({
            path: fields.slug,
            component: require.resolve("./src/blog-post"),
            context: {
              id: node.id,
              title: frontmatter.title,
              webmentionMatchURL: node.fields.webmentionMatchURL
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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField, createNode, createParentChildLink } = actions;

  if (node.internal.type === `Mdx`) {
    const { frontmatter } = node;
    const parent = getNode(node.parent);

    const slug =
      frontmatter.url ||
      `/post/${frontmatter.slug ||
        slugify(frontmatter.title) ||
        slugify(parent.name)}`;

    createNodeField({
      name: `slug`,
      node,
      value: slug
    });

    createNodeField({
      name: `webmentionMatchURL`,
      node,
      value: `https://www.christopherbiscardi.com${slug}/`
    });

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
        url: node.frontmatter.url || slug,
        date: node.frontmatter.date,
        tags: node.frontmatter.tags,
        egghead: node.frontmatter.egghead,
        isNewsletter: !!node.frontmatter.isNewsletter
      };

      createNode({
        ...fieldData,
        // Required fields.
        id: `${node.id} >>> MdxBlogPost`,
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
