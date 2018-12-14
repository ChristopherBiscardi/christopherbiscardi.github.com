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
import { H1, H2, H3, H4, H5, H6 } from "@sens8/component-typography/display";
import { Code } from "sens8";

// ensure components are stable
const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Text,
  ol: OL,
  ul: UL,
  a: props => <Link {...props} css={{ color: "#ff5e99" }} />,
  sub: Sub,
  sup: Sup,
  blockquote: BlockQuote,
  pre: ({ children: { props } }) => {
    // props is for MDXTag, props.props is for code element
    const lang = props.props.className && props.props.className.split("-")[1];
    return <Code is="block" lang={lang} {...props} />;
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
      <div
        css={{
          background: "#592000",
          padding: "1rem",
          color: "white"
        }}
      >
        <Text css={{ marginBottom: 0, maxWidth: "100%" }}>
          Warning: Under Construction. I am using this site as my playground as
          I build&nbsp;
          <Link
            css={{ color: "#ff5e99" }}
            href="https://github.com/ChristopherBiscardi/gatsby-mdx"
          >
            gatsby-mdx
          </Link>
          <span> and </span>
          <Link
            css={{ color: "#ff5e99" }}
            href="https://www.gatsbyjs.org/blog/2018-11-11-introducing-gatsby-themes/"
          >
            gatsby themes
          </Link>
          . During this time I will also repost new content&nbsp;
          <Link
            css={{ color: "#ff5e99" }}
            href="https://medium.com/@chrisbiscardi"
          >
            to Medium
          </Link>
        </Text>
      </div>
      <div>{children}</div>
    </MDXProvider>
  </ThemeProvider>
);
