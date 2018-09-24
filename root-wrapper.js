import React from "react";
import { ThemeProvider } from "emotion-theming";
import { MDXProvider } from "@mdx-js/tag";
import theme from "@sens8/tokens";
import { injectGlobal } from "react-emotion";
import posed, { PoseGroup } from "react-pose";

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

const AnimatedText = posed.p({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
});

require("prismjs");
//require("prismjs/themes/prism-tomorrow.css");
require("./src/prism");

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

const Container = posed.div({
  enter: { staggerChildren: 50 }
});

export default ({ children, ...props }) => (
  <ThemeProvider theme={theme}>
    <MDXProvider
      components={{
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        p: ({ children, ...props }) => (
          <AnimatedText {...props}>{children}</AnimatedText>
        ),
        ol: OL,
        ul: UL,
        a: Link,
        sub: Sub,
        sup: Sup,
        blockquote: BlockQuote,
        code: ({ children, ...props }) => (
          <PrismCode {...props}>{children}</PrismCode>
        ),
        pre: posed.pre({
          enter: { x: 0, opacity: 1 },
          exit: { x: 50, opacity: 0 }
        })
      }}
    >
      <Container>{children}</Container>
    </MDXProvider>
  </ThemeProvider>
);
