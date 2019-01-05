import Helmet from "react-helmet";
import React, { Component } from "react";
import { graphql, Link } from "gatsby";

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
        {this.props.data.allMdx.edges.map(({ node }) => {
          const { excerpt, frontmatter = {}, id, fields, parent } = node;
          return (
            <PostBox
              key={id}
              excerpt={excerpt}
              title={frontmatter.title}
              date={frontmatter.date}
              tags={frontmatter.tags}
              url={fields.slug}
            />
          );
        })}
      </SiteLayout>
    );
  }
}

class PostBox extends Component {
  render() {
    const { url, title, excerpt, tags, date } = this.props;
    return (
      <div css={{ margin: "auto", padding: "0 1.5rem", maxWidth: "38rem" }}>
        <Heading>{title}</Heading>
        <Text>
          {excerpt}
          &nbsp;
          <Link to={url} css={{ color: "#ff5e99" }}>
            Read more...
          </Link>
        </Text>
        <div css={{ paddingBottom: "2.5rem" }}>
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
          }
          frontmatter {
            date
            url
            title
            tags
          }
          excerpt
          parent {
            ... on File {
              name
            }
          }
        }
      }
    }
  }
`;
