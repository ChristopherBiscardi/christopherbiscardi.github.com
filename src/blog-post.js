import React, { Component } from "react";
import { MDXProvider } from "@mdx-js/tag";

export default class BlogPost extends Component {
  render() {
    const { children } = this.props;
    return (
      <MDXProvider
        components={{
          h1: ({ children }) => <h1 className="gatsby-mdx">{children}</h1>,
          h2: ({ children }) => (
            <h2 className="gatsby-mdx custom component">{children}</h2>
          )
        }}
      >
        <div>{children}</div>
      </MDXProvider>
    );
  }
}
export const pageQuery = graphql`
  query BlogPostQuery($absPath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $absPath }) {
      id
      rawMarkdownBody
    }
  }
`;
