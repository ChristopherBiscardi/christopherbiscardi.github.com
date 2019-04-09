import Helmet from "react-helmet";
import React, { Component } from "react";
import { graphql } from "gatsby";

import { Heading } from "sens8";
import SiteLayout from "./site-layout";
import PostList from "./post-list";
import Img from "gatsby-image";

export default class ContentByTagTemplate extends Component {
  render() {
    const { tag } = this.props.pageContext;

    return (
      <SiteLayout>
        <Helmet>
          <title>{tag}</title>
          <meta
            name="description"
            content={`Content on the topic: ${tag} by Chris Biscardi`}
          />
          <meta name="referrer" content="origin" />
        </Helmet>
        <div>
          <Img
            css={{ minHeight: "300px", zIndex: -1 }}
            fluid={this.props.data.headingImage.childImageSharp.fluid}
          />
          <section
            css={{
              position: "absolute",
              top: 0,
              width: "100%",
              alignItems: "center",
              //            background: theme.colors.raw.neutral[90],
              background: "none",
              display: "flex",
              flexDirection: "column",
              height: "40vh",
              justifyContent: "center",
              marginBottom: "1.5rem"
            }}
          >
            <Heading
              css={{
                textShadow: "2px 2px 1vw #1f2933",
                fontSize: "10vw",
                marginTop: "14vw"
              }}
              level={1}
            >
              Content in {tag}
            </Heading>
          </section>
        </div>
        <PostList posts={this.props.data.allBlogPost.edges} />
      </SiteLayout>
    );
  }
}

export const pageQuery = graphql`
  query ContentByTagQuery($tag: String!) {
    allBlogPost(
      filter: { tags: { in: [$tag] } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          ...PostListItemFragment
        }
      }
    }
    headingImage: file(
      sourceInstanceName: { eq: "images" }
      relativePath: { eq: "luca-zanon-26595-unsplash.jpg" }
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
