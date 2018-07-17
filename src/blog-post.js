import React, { Component } from "react";
import { MDXProvider } from "@mdx-js/tag";

import PrismCode from "react-prism";
import Text, {
  OL,
  UL,
  Sup,
  Sub,
  BlockQuote,
  Link
} from "@sens8/component-typography/linear";
import { H1, H2, H3, H4, H5, H6 } from "@sens8/component-typography/display";

require("prismjs");
require("prismjs/themes/prism.css");

export default class BlogPost extends Component {
  render() {
    const { children } = this.props;

    return (
      <MDXProvider
        components={{
          h1: H1,
          h2: H2,
          p: Text,
          ol: OL,
          ul: UL,
          a: Link,
          sub: Sub,
          sup: Sup,
          blockquote: BlockQuote,
          code: ({ children, ...props }) => (
            <PrismCode {...props}>{children}</PrismCode>
          )
        }}
      >
        <div>{children}</div>
      </MDXProvider>
    );
  }
}
/* export const pageQuery = graphql`
 *   query BlogPostQuery($absPath: String!) {
 *     markdownRemark(fileAbsolutePath: { eq: $absPath }) {
 *       id
 *       rawMarkdownBody
 *     }
 *   }
 * `;*/
