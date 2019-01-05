import React from "react";
import { ThemeProvider } from "emotion-theming";
import { MDXProvider } from "@mdx-js/tag";
import theme from "@sens8/tokens";
import { Global } from "@emotion/core";

import Text, {
  OL,
  UL,
  Sup,
  Sub,
  BlockQuote,
  Link
} from "@sens8/component-typography/linear";
import { Code, Heading } from "sens8";

// ensure components are stable
const components = {
  h1: props => <Heading {...props} level={1} />,
  h2: props => <Heading {...props} level={2} />,
  h3: props => <Heading {...props} level={3} />,
  h4: props => <Heading {...props} level={4} />,
  h5: props => <Heading {...props} level={5} />,
  h6: props => <Heading {...props} level={6} />,
  p: Text,
  ol: OL,
  "ol.li": props => (
    <li
      {...props}
      css={{ marginBottom: ".5em", lineHeight: 1.5, fontFamily: "Inter UI" }}
    />
  ),
  ul: UL,
  a: props => <Link {...props} css={{ color: "#ff5e99" }} />,
  sub: Sub,
  sup: Sup,
  blockquote: BlockQuote,
  pre: ({ children: { props } }) => {
    // props is for MDXTag, props.props is for code element
    const lang = props.props.className && props.props.className.split("-")[1];
    return (
      <div
        css={({ colors }) => ({
          display: "flex",
          justifyContent: "center",
          background: colors.raw.neutral[90],
          width: "100% !important",
          marginBottom: "1.5rem",
          "& pre": {
            maxWidth: "calc(38rem - 1.5rem)",
            width: "100%",
            padding: "1.5rem"
          }
        })}
      >
        <Code is="block" lang={lang} {...props} />
      </div>
    );
  },
  inlineCode: Code
};

export default ({ children, ...props }) => (
  <ThemeProvider theme={theme}>
    <MDXProvider components={components}>
      <Global
        styles={{
          "*": {
            margin: 0,
            padding: 0,
            boxSizing: "border-box"
          },
          body: {
            background: theme.colors.background
          }
        }}
      />
      <div>{children}</div>
    </MDXProvider>
  </ThemeProvider>
);
