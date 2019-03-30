import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import theme from "@sens8/tokens";
import { Heading, Text } from "sens8";
import { useLayers } from "@sens8/tokens";
import Img from "gatsby-image";

import Nav from "../navigation";

const Hero = props => {
  const backgroundColor = useLayers(0);
  return (
    <div
      css={{
        alignItems: "center",
        background: backgroundColor,
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
  );
};

export default class IndexPage extends Component {
  render() {
    const { featuredPosts } = this.props.data;
    return (
      <div>
        <Helmet>
          <title>Chris Biscardi</title>
          <meta name="description" content="Christopher Biscardi's website" />
          <meta name="referrer" content="origin" />
        </Helmet>
        <Nav />
        <Hero />
        <div
          css={{
            "@media only screen and (min-width : 700px)": {
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridGap: ".5rem",
              margin: "0 1rem"
            }
          }}
        >
          {featuredPosts.edges.map(({ node }) => (
            <Link to={node.fields.slug} css={{ textDecoration: "none" }}>
              <FeaturedPost {...node} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

const FeaturedPost = ({ id, frontmatter, fields, excerpt }) => {
  const backgroundColor = useLayers(1);
  if (!frontmatter.featuredImage && !fields.featuredImage) {
    return (
      <div
        css={{
          background: backgroundColor,
          padding: ".5rem"
        }}
      >
        <Heading>{frontmatter.title}</Heading>
        <Text>{excerpt}</Text>
      </div>
    );
  }
  const featuredImage = frontmatter.featuredImage || fields.featuredImage;
  return (
    <Img
      alt={frontmatter.title}
      key={id}
      fluid={featuredImage.childImageSharp.fluid}
    />
  );
};

export const query = graphql`
  query {
    featuredPosts: allMdx(
      filter: { fields: { sourceInstanceName: { eq: "posts" } } }
      limit: 10
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
            featuredImage {
              id
              childImageSharp {
                fluid(maxWidth: 700) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          frontmatter {
            title
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 700) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
