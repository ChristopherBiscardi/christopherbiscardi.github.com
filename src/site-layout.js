import React, { Component } from "react";
import palx from "palx";
import { ThemeProvider } from "emotion-theming";
import { MDXProvider } from "@mdx-js/tag";
import styled, { css, injectGlobal } from "react-emotion";
import theme from "@sens8/tokens";
import { space } from "styled-system";

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
//require("prismjs/themes/prism-tomorrow.css");
require("./prism");

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: ${theme.colors.background};
  }
`;

const SidebarContainer = styled.div`
  background: ${({ theme }) => theme.colors.backgroundLayers[3]};
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.backgroundLayers[2]};
`;

const ContentContainer = styled.div`
  ${space};
`;

export default class SiteLayout extends Component {
  render() {
    const { children, sidebar } = this.props;

    return (
      <ThemeProvider theme={theme}>
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
              <SidebarContainer>{sidebar}</SidebarContainer>
              <ContentContainer>{children}</ContentContainer>
            </div>
          </div>
        </MDXProvider>
      </ThemeProvider>
    );
  }
}
