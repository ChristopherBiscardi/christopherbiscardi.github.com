import Box from "superbox/emotion";
import Helmet from "react-helmet";
import React, { Component } from "react";
import slugify from "slugify";
import styled, { css } from "react-emotion";
import { graphql, Link } from "gatsby";

import { H1, H2 } from "@sens8/component-typography/display";
import Text from "@sens8/component-typography/linear";
import { Tag } from "sens8";

import SiteLayout from "../site-layout";

const Hero = styled.section`
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundLayers[3]};
  display: flex;
  flex-direction: column;
  height: 40vh;
  justify-content: center;

  margin-bottom: 1.5rem;
`;

const title = css`
  font-size: 1.5em;
  color: #ff79c6;
  margin-bottom: 0.5em;
  a {
    color: #8be9fd;
  }
`;

const Subtitle = styled.p`
  color: #bd93f9;
`;

export default class PostsPage extends Component {
  render() {
    return (
      <SiteLayout>
        <Helmet>
          <title>Chris Biscardi</title>
          <meta name="description" content="Christopher Biscardi's website" />
          <meta name="referrer" content="origin" />
        </Helmet>
        <Hero>
          <H1 className={title}>Chris Biscardi</H1>
          <Subtitle>Posts</Subtitle>
        </Hero>
        {this.props.data.allMdx.edges.map(({ node }) => {
          const { excerpt, frontmatter = {}, id, parent } = node;
          return (
            <PostBox
              key={id}
              excerpt={excerpt}
              title={frontmatter.title}
              date={frontmatter.date}
              tags={frontmatter.tags}
              url={
                frontmatter.url ||
                `/post/${frontmatter.slug ||
                  slugify(parent.name, { lower: true })}`
              }
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
      <Box
        m="auto"
        css={`
          max-width: 38rem;
        `}
      >
        <H2>{title}</H2>
        <Text>
          {excerpt}
          &nbsp;
          <Link to={url}>Read more...</Link>
        </Text>
        <div
          css={`
            padding-bottom: 2.5rem;
          `}
        >
          {tags && tags.map((v /* TODO: tags component */) => <Tag>{v}</Tag>)}
        </div>
      </Box>
    );
  }
}

export const pageQuery = graphql`
  query PostsQuery {
    allMdx(sort: { fields: frontmatter___date, order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            date
            slug
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
