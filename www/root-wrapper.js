import React from "react";
import { MDXProvider } from "@mdx-js/react";
import theme from "@sens8/tokens";
import { Global } from "@emotion/core";
import { Sens8Context, useLayers } from "@sens8/tokens";

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
  wrapper: ({ children, className, ...props }) => (
    <div className={className}>{children}</div>
  ),
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
      css={{
        marginBottom: ".5em",
        paddingLeft: ".5rem",
        lineHeight: 1.5,
        fontFamily: "Inter UI"
      }}
    />
  ),
  ul: UL,
  "ul.li": props => (
    <li
      {...props}
      css={{
        marginBottom: ".5em",
        paddingLeft: ".5rem",
        lineHeight: 1.5,
        fontFamily: "Inter UI"
      }}
    />
  ),
  a: Link,
  sub: Sub,
  sup: Sup,
  blockquote: BlockQuote,
  img: props => <img {...props} css={{ maxWidth: "100%" }} />, // eslint-disable-line jsx-a11y/alt-text
  pre: ({ children: { props } }) => {
    const backgroundColor = useLayers(0);
    // props is for MDXTag, props.props is for code element
    const lang = props.className && props.className.split("-")[1];
    return (
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          background: backgroundColor,
          width: "100% !important",
          marginBottom: "1.5rem",
          overflowX: "auto",
          "& pre": {
            maxWidth: "calc(38rem - 1.5rem)",
            overflowX: "auto",
            width: "100%",
            padding: "1.5rem"
          }
        }}
      >
        <Code is="block" lang={lang} {...props} />
      </div>
    );
  },
  inlineCode: Code
};

export default ({ children, ...props }) => (
  <Sens8Context.Provider value={theme}>
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
  </Sens8Context.Provider>
);