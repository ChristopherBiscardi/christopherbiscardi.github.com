import React, { Component } from "react";
import { graphql } from "gatsby";
import { Heading } from "@sens8/component-typography";
import { withMDXComponents } from "@mdx-js/tag/dist/mdx-provider";
import { MDXProvider } from "@mdx-js/tag";
import MDXRenderer from "gatsby-mdx/mdx-renderer";

import SiteLayout from "./site-layout";

export default withMDXComponents(
  class BlogPost extends Component {
    render() {
      const { data, components } = this.props;

      return (
        <SiteLayout
          sidebar={<aside css={{ minWidth: "200px" }}>some stuff</aside>}
        >
          <MDXProvider
            components={{
              ...components
            }}
          >
            <div
              css={theme => ({
                display: "flex",
                background: theme.colors.raw.neutral[90],
                height: "30vh",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem"
              })}
            >
              <Heading level={1}>{data.mdx.frontmatter.title}</Heading>
            </div>
            <div
              data-id="wrapper"
              css={{
                "& > div > :not(div)": {
                  maxWidth: "38rem",
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  padding: "0 1rem"
                },
                "& code": {
                  maxWidth: "38rem"
                }
              }}
            >
              <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
            </div>
          </MDXProvider>
        </SiteLayout>
      );
    }
  }
);

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
