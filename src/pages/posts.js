import Box from "superbox/emotion";
import Helmet from "react-helmet";
import React, { Component } from "react";
import slugify from "slugify";
import styled, { css } from "react-emotion";
import { graphql, Link } from "gatsby";

import { H1, H2 } from "@sens8/component-typography/display";
import Text from "@sens8/component-typography/linear";

import SiteLayout from "../site-layout";

const Hero = styled.section`
  align-items: center;
  background: #282a36;
  display: flex;
  flex-direction: column;
  height: 60vh;
  justify-content: center;
  width: 100vw;
  margin-bottom: 1.5rem;
`;

// Using css with template literal
const title = css`
  font-size: 1.5em;
  color: #ff79c6;
  margin-bottom: 0.5em;
  a {
    color: #8be9fd;
  }
`;

// Using css with object
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
        {this.props.data.allMarkdownRemark.edges.map(({ node }) => {
          const { excerpt, frontmatter = {}, id } = node;
          return (
            <PostBox
              key={id}
              excerpt={excerpt}
              title={frontmatter.title}
              date={frontmatter.date}
            />
          );
        })}
      </SiteLayout>
    );
  }
}

class PostBox extends Component {
  render() {
    const { title, excerpt } = this.props;
    return (
      <Box
        m="auto"
        css={`
          max-width: 38rem;
        `}
      >
        <H2>{title}</H2>
        <Text>
          {excerpt}&nbsp;
          <Link to={`/post/${slugify(title, { lower: true })}`}>
            Read more...
          </Link>
        </Text>
      </Box>
    );
  }
}
export const pageQuery = graphql`
  query PostsQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
