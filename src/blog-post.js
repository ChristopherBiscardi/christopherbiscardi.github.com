import React, { Component } from "react";
import styled from "react-emotion";
import { graphql } from "gatsby";
import { Heading } from "@sens8/component-typography";

import MDXRenderer from "gatsby-mdx/mdx-renderer";

import SiteLayout from "./site-layout";

const Sidebar = styled.aside`
  position: fixed;
`;

const Hero = styled.div`
  display: flex;
  background: ${({ theme }) => theme.colors.backgroundLayers[3]};
  height: 30vh;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

export default class BlogPost extends Component {
  render() {
    const { data, __mdxScope } = this.props;

    return (
      <SiteLayout sidebar={<Sidebar>some stuff</Sidebar>}>
        <Hero>
          <Heading level={1}>{data.mdx.frontmatter.title}</Heading>
        </Hero>
        <div
          data-id="wrapper"
          css={`
            & > div > :not(pre) {
              width: 38rem;
              margin-left: auto;
              margin-right: auto;
            }
          `}
        >
          <MDXRenderer scope={__mdxScope}>{data.mdx.code.body}</MDXRenderer>
        </div>
      </SiteLayout>
    );
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      code {
        body
      }
      frontmatter {
        title
      }
    }
  }
`;
