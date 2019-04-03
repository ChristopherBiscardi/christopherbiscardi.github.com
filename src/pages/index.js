import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
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
            <Link to={node.url} css={{ textDecoration: "none" }}>
              <FeaturedPost {...node} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

const FeaturedPost = ({ id, parent, excerpt, title }) => {
  const backgroundColor = useLayers(1);
  if (!parent.fields.featuredImage) {
    return (
      <div
        css={{
          background: backgroundColor,
          padding: ".5rem"
        }}
      >
        <Heading>{title}</Heading>
        <Text>{excerpt}</Text>
      </div>
    );
  }
  return (
    <Img
      alt={title}
      key={id}
      fluid={parent.fields.featuredImage.childImageSharp.fluid}
    />
  );
};

export const query = graphql`
  query {
    featuredPosts: allBlogPost(limit: 10, sort: { fields: date, order: DESC }) {
      edges {
        node {
          id
          title
          excerpt
          url
          ... on MdxBlogPost {
            parent {
              ... on Mdx {
                fields {
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
      }
    }
  }
`;
