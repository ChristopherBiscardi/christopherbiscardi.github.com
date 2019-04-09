import React, { Component } from "react";
import Img from "gatsby-image";

import { graphql, Link } from "gatsby";

import { Heading, Text, Tag } from "sens8";
import { useTextColor, useLayers } from "@sens8/tokens";

export default class PostList extends Component {
  render() {
    const { posts } = this.props;
    return (
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
        {posts.map(({ node }) => {
          const { excerpt, title, date, tags, id, url, parent } = node;
          return (
            <PostListItem
              key={id}
              excerpt={excerpt}
              title={title}
              date={date}
              tags={tags}
              url={url}
              featuredImage={parent.fields.featuredImage}
            />
          );
        })}
      </div>
    );
  }
}

const PostListItem = ({ url, title, excerpt, tags, featuredImage }) => {
  const textColor = useTextColor();
  const backgroundColor = useLayers(1);
  return (
    <div
      css={{
        margin: "auto",
        padding: "1rem",
        background: backgroundColor,
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
            <Tag key={v}>
              <Link to={`/tags/${v}`} css={{ color: textColor }}>
                {v}
              </Link>
            </Tag>
          ))}
      </div>
    </div>
  );
};

export const PostListItemFragment = graphql`
  fragment PostListItemFragment on BlogPost {
    id
    date
    url
    title
    tags
    excerpt
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
`;
