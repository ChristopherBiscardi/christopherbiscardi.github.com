import React from "react";
import theme from "@sens8/tokens";
import { Global, css } from "@emotion/core";
import { MDXProvider } from "@mdx-js/tag";
import { Heading, Text, Code, OrderedList } from "sens8";
import { ThemeProvider } from "emotion-theming";
import Helmet from "react-helmet";

import LiveCode from "./src/components/live-code";

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html,
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Roboto Light", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
            "Droid Sans", "Helvetica Neue", sans-serif, "Apple Color Emoji",
            "Segoe UI Emoji", "Segoe UI Symbol";
        }
      `}
    />

    <MDXProvider
      components={{
        h1: ({ children, ...props }) => <Heading level={1}>{children}</Heading>,
        h2: ({ children, ...props }) => <Heading level={2}>{children}</Heading>,
        h3: ({ children, ...props }) => <Heading level={3}>{children}</Heading>,
        h4: ({ children, ...props }) => <Heading level={4}>{children}</Heading>,
        h5: ({ children, ...props }) => <Heading level={5}>{children}</Heading>,
        h6: ({ children, ...props }) => <Heading level={6}>{children}</Heading>,
        p: Text,
        ol: props => <OrderedList {...props} />,
        "ol.li": props => <li {...props} css={{ marginTop: ".5em" }} />,
        code: ({ children, "react-live": useReactLive, ...props }) =>
          useReactLive ? (
            <LiveCode {...props}>{children}</LiveCode>
          ) : (
            <Code is="block" {...props}>
              {children}
            </Code>
          ),
        inlineCode: ({ children, ...props }) => (
          <Code {...props}>{children}</Code>
        )
      }}
    >
      <>
        <Helmet>
          <title>Sens8 Design System</title>
          <meta name="description" content="Sens8 Docs" />
          <meta name="referrer" content="origin" />
        </Helmet>
        {children}
      </>
    </MDXProvider>
  </ThemeProvider>
);
