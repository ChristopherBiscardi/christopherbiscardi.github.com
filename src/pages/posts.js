import Helmet from "react-helmet";
import React, { Component } from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";

import { Heading, Text, Tag } from "sens8";
import SiteLayout from "../site-layout";

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
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gridGap: "1rem",
            padding: "0 1rem",
            "@media screen and (min-width:38rem) ": {
              gridTemplateColumns: "repeat(2,1fr)"
            },
            "@media screen and (min-width:1200px) ": {
              gridTemplateColumns: "repeat(3,1fr)"
            }
          }}
        >
          {this.props.data.allMdx.edges.map(({ node }) => {
            const { excerpt, frontmatter = {}, id, fields } = node;
            return (
              <PostBox
                key={id}
                excerpt={excerpt}
                title={frontmatter.title}
                date={frontmatter.date}
                tags={frontmatter.tags}
                url={fields.slug}
                featuredImage={fields.featuredImage}
              />
            );
          })}
        </div>
      </SiteLayout>
    );
  }
}

class PostBox extends Component {
  render() {
    const { url, title, excerpt, tags, featuredImage /*, date*/ } = this.props;
    return (
      <div
        css={{
          margin: "auto",
          padding: "1rem",
          maxWidth: "400px",
          background: "#1f2933",
          maxWidth: "38rem",
          marginTop: "1.5rem"
        }}
      >
        {featuredImage && (
          <Img
            css={{ marginBottom: "1rem" }}
            alt={title}
            fluid={featuredImage.childImageSharp.fluid}
          />
        )}
        <Heading
          css={{
            borderLeft: "3px solid #ff5e99",
            paddingLeft: "1rem"
          }}
        >
          {title}
        </Heading>
        <Text css={{ minWidth: "inherit" }}>
          {excerpt}
          &nbsp;
        </Text>
        <Text css={{ minWidth: "inherit" }}>
          <Link to={url} css={{ color: "#ff5e99" }}>
            Read more...
          </Link>
        </Text>

        <div>
          {tags &&
            tags.map(v => (
              <Tag key={v} css={{ fontFamily: "Inter UI" }}>
                {v}
              </Tag>
            ))}
        </div>
      </div>
    );
  }
}

export const pageQuery = graphql`
  query PostsQuery {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 700) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          frontmatter {
            date
            url
            title
            tags
          }
          excerpt
        }
      }
    }
  }
`;
