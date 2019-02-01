import Helmet from "react-helmet";
import React, { Component } from "react";
import { graphql, Link } from "gatsby";

import { Heading, Text, Tag } from "sens8";
import SiteLayout from "../site-layout";
import PostList from "../post-list";

export default class PostsPage extends Component {
  render() {
    return (
      <SiteLayout>
        <Helmet>
          <title>Chris Biscardi</title>
          <meta name="description" content="Christopher Biscardi's website" />
          <meta name="referrer" content="origin" />
        </Helmet>
        <section
          css={theme => ({
            alignItems: "center",
            background: theme.colors.raw.neutral[90],
            display: "flex",
            flexDirection: "column",
            height: "40vh",
            justifyContent: "center",
            marginBottom: "1.5rem"
          })}
        >
          <Heading level={1} css={{ color: "#ff79c6" }}>
            Chris Biscardi
          </Heading>
          <Text css={{ color: "#bd93f9", textAlign: "center" }}>Posts</Text>
        </section>
        <PostList posts={this.props.data.allMdx.edges} />
      </SiteLayout>
    );
  }
}

export const pageQuery = graphql`
  query PostsQuery {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          ...PostListItemFragment
        }
      }
    }
  }
`;
