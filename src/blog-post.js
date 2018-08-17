import React, { Component } from "react";
import styled from "react-emotion";

import MDXRenderer from "gatsby-mdx/mdx-renderer";

import SiteLayout from "./site-layout";

const Sidebar = styled.aside`
  position: fixed;
`;

export default class BlogPost extends Component {
  render() {
    const { data, __mdxScope } = this.props;

    return (
      <SiteLayout sidebar={<Sidebar>some stuff</Sidebar>}>
        <MDXRenderer scope={__mdxScope}>{data.mdx.codeBody}</MDXRenderer>
      </SiteLayout>
    );
  }
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      codeBody
    }
  }
`;
