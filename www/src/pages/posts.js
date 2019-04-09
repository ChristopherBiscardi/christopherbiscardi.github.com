import Helmet from "react-helmet";
import React, { Component } from "react";
import { graphql } from "gatsby";

import { Heading } from "sens8";
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
        <div>
          <section
            css={theme => ({
              alignItems: "center",
              //            background: theme.colors.raw.neutral[90],
              background: "none",
              display: "flex",
              flexDirection: "column",
              height: "40vh",
              justifyContent: "center",
              marginBottom: "1.5rem"
            })}
          >
            <Heading
              css={{
                textShadow: "2px 2px 1vw #1f2933",
                fontSize: "10vw",
                marginTop: "14vw"
              }}
              level={1}
            >
              Blog Posts
            </Heading>
          </section>
        </div>
        <PostList posts={this.props.data.allBlogPost.edges} />
      </SiteLayout>
    );
  }
}

export const pageQuery = graphql`
  query PostsQuery {
    allBlogPost(sort: { fields: date, order: DESC }) {
      edges {
        node {
          ...PostListItemFragment
        }
      }
    }
  }
`;
