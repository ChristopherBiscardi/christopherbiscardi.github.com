import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import theme from "@sens8/tokens";
import { Heading } from "sens8";
import Nav from "../navigation";

export default class IndexPage extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Chris Biscardi</title>
          <meta name="description" content="Christopher Biscardi's website" />
          <meta name="referrer" content="origin" />
        </Helmet>
        <Nav />
        <div
          css={{
            alignItems: "center",
            background: theme.colors.background,
            display: "flex",
            flexDirection: "column",
            height: "30vh",
            justifyContent: "center"
          }}
        >
          <Heading
            level={1}
            css={{
              color: "#ff79c6"
            }}
          >
            Chris Biscardi
          </Heading>
        </div>
        <div>{featuredPosts.edges.map(({node}) => <Image src="" {node.fixed}/>)}</div>
      </div>
    );
  }
}

export const query = graphql`
  query {
    featuredPosts: allMdx(
      limit: 10
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            featuredImage {
              childImageSharp {
                fixed {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;
