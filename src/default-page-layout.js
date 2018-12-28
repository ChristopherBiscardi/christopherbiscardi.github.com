import React, { Component } from "react";
import { graphql } from "gatsby";
import { Heading } from "@sens8/component-typography";
import { MDXProvider } from "@mdx-js/tag";

import SiteLayout from "./site-layout";

export default class BlogPost extends Component {
  render() {
    return (
      <SiteLayout
        sidebar={<aside css={{ position: "fixed" }}>some stuff</aside>}
      >
        <div
          css={theme => ({
            display: "flex",
            background: theme.colors.background,
            height: "30vh",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.5rem"
          })}
        >
          <Heading level={1}>
            {this.props.pageContext.frontmatter.title}
          </Heading>
        </div>
        <div
          data-id="wrapper"
          css={{
            "& > div > :not(pre)": {
              width: "38rem",
              marginLeft: "auto",
              marginRight: "auto"
            },
            "& code": {
              maxWidth: "38rem"
            }
          }}
        >
          {this.props.children}
        </div>
      </SiteLayout>
    );
  }
}
