import React, { Component } from "react";
import styled from "react-emotion";
import { graphql } from "gatsby";
import { Heading } from "@sens8/component-typography";
import { withMDXComponents } from "@mdx-js/tag/dist/mdx-provider";
import posed, { PoseGroup } from "react-pose";
import { MDXProvider } from "@mdx-js/tag";
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

const AnimatedHeading = posed(Heading)({
  enter: { y: 0, opacity: 1 },
  exit: { y: 15, opacity: 0 }
});

const animateMDXComponents = componentMap =>
  Object.entries(componentMap)
    .map(([name, component]) => [
      name,
      component
      /*posed(component)({
             enter: { y: 0, opacity: 1 },
             exit: { y: 15, opacity: 0 }
             })*/
    ])
    .reduce((acc, [k, v]) => ({ [k]: v, ...acc }), {});
export default withMDXComponents(
  class BlogPost extends Component {
    render() {
      const { data, components } = this.props;

      return (
        <SiteLayout sidebar={<Sidebar>some stuff</Sidebar>}>
          <MDXProvider
            components={{
              ...animateMDXComponents(components)
            }}
          >
            <Hero>
              <AnimatedHeading level={1}>
                {data.mdx.frontmatter.title}
              </AnimatedHeading>
            </Hero>
            <div
              data-id="wrapper"
              css={`
                & > div > :not(pre) {
                  width: 38rem;
                  margin-left: auto;
                  margin-right: auto;
                }
                & code {
                  max-width: 38rem;
                }
              `}
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
