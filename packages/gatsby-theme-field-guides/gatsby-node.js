exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions;

  createFieldExtension({
    name: "linkFieldGuideInterface",
    extend(options, prevFieldConfig) {
      return {
        resolve: async (source, args, context, info) => {
          const fieldValues = context.defaultFieldResolver(
            source,
            args,
            context,
            info
          );
          const results = await context.nodeModel.runQuery({
            type: "GuidesYaml",
            query: {
              filter: {
                slug: { in: fieldValues }
              }
            }
          });
          return results;
        }
      };
    }
  });

  // createFieldExtension({
  //   name: "linkFieldGuideEntryInterface",
  //   extend(options, prevFieldConfig) {
  //     return {
  //       resolve: async (source, args, context, info) => {
  //         console.log("soruce", source);
  //         const fieldValues = context.defaultFieldResolver(
  //           source,
  //           args,
  //           context,
  //           info
  //         );
  //         const results = await context.nodeModel.runQuery({
  //           type: "MdxBlogPostFieldGuideEntry",
  //           query: {
  //             filter: {
  //               guides: { in:  }
  //             }
  //           }
  //         });
  //         return results;
  //       }
  //     };
  //   }
  // });
  createTypes(`interface FieldGuide @nodeInterface {
      id: ID!
      slugIdentifier: String!
      displayName: String!
      description: String
      items: [FieldGuideEntry!]
    }
    interface FieldGuideEntry @nodeInterface {
        id: ID!
        title: String!
        description: String
        guides: [FieldGuide]
    }`);

  createTypes(`type GuidesYaml implements Node & FieldGuide {
        id: ID!
        displayName: String! @proxy(from: "title")
        slugIdentifier: String! @proxy(from: "slug")
        description: String
        items: [FieldGuideEntry!] 
    }
    type MdxBlogPostFieldGuideEntry implements Node & FieldGuideEntry @childOf(type: "MdxBlogPost") {
        id: ID!
        title: String!
        description: String
        guides: [FieldGuide] @link(by: "slugIdentifier")
    }
    `);
};

// exports.createResolvers = ({ createResolvers }) => {
//   const resolvers = {
//     ChainsYaml: {
//       items: {
//         type: ["Node!"],
//         resolve: async (source, args, context, info) => {
//           console.log("source", source);
//           const blogPosts = await context.nodeModel.runQuery({
//             query: {},
//             type: "BlogPost",
//             firstOnly: false
//           });
//           const chains = await context.nodeModel.runQuery({
//             query: {},
//             type: "Chain",
//             firstOnly: false
//           });
//           // console.log(chains, blogPosts);
//           return [];
//           /**
//            * [{
//            *   chain: Chain,
//            *   items: [BlogPost]
//            * }]
//            */
//         }
//       }
//     }
//   };
//   createResolvers(resolvers);
// };

exports.onCreateNode = ({ node, actions, getNode, createNodeId }) => {
  if (node.internal.type !== "MdxBlogPost") {
    return;
  }

  const mdxNode = getNode(node.parent);

  if (mdxNode.frontmatter.guides) {
    actions.createNode({
      title: node.title,
      guides: mdxNode.frontmatter.guides,
      id: createNodeId(`MdxBlogPostFieldGuideEntry-${node.id}`),
      parent: node.id,
      internal: {
        type: "MdxBlogPostFieldGuideEntry",
        contentDigest: mdxNode.internal.contentDigest
      }
    });
  }
};
