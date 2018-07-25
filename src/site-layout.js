import React, { Component } from "react";
import palx from "palx";
import { ThemeProvider } from "emotion-theming";
import { MDXProvider } from "@mdx-js/tag";
import { css, injectGlobal } from "react-emotion";

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

import Nav from "./navigation";

require("prismjs");
require("prismjs/themes/prism-tomorrow.css");

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: #d5d6d7;
  }
`;

export default class SiteLayout extends Component {
  render() {
    const { children, sidebar } = this.props;

    return (
      <ThemeProvider theme={{ color: palx("#081d2b") }}>
        <MDXProvider
          components={{
            h1: H1,
            h2: H2,
            h3: H3,
            h4: H4,
            h5: H5,
            h6: H6,
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
          <div>
            <Nav />
            <div
              className={
                sidebar &&
                css`
                  display: grid;
                  grid-template-columns: 200px 1fr;
                `
              }
            >
              <div>{sidebar}</div>
              <div>{children}</div>
            </div>
          </div>
        </MDXProvider>
      </ThemeProvider>
    );
  }
}
