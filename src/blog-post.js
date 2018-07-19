import React, { Component } from "react";
import styled from "react-emotion";

import SiteLayout from "./site-layout";

const Sidebar = styled.aside`
  position: fixed;
`;

export default class BlogPost extends Component {
  render() {
    const { children } = this.props;

    return (
      <SiteLayout sidebar={<Sidebar>some stuff</Sidebar>}>
        {children}
      </SiteLayout>
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
