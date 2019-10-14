/** @jsx jsx */
import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import { jsx } from "@emotion/core";
// import { getMonth } from "date-fns";

const RainbowBorder = ({ children, ...props }) => (
  <div
    css={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: "1rem",

      position: "relative",
      padding: "1px",
      boxSizing: "border-box",

      background: "#1b1f2a",
      backgroundClip: "padding-box",
      border: "solid 1px transparent",
      borderRadius: "1rem",
      zIndex: 99,

      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
        margin: "-1px",
        // background: 'linear-gradient(to right, red, orange)',
        backgroundColor: "#ff1493",
        background:
          "linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)",
        borderRadius: "1rem"
      }
    }}
  >
    {children}
  </div>
);

const fontSize = 20;
const aliases = {
  golang: "go"
};
const CodeBlock = ({ lang: rawLang, value }) => {
  const lang = aliases[rawLang] || rawLang;
  return (
    <div
      css={{
        fontSize: `${fontSize}px`,
        display: "inline-block",
        position: "relative",
        padding: `${fontSize}px`,
        overflow: "hidden",
        background: "#1b1f2a"
      }}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap"
        rel="stylesheet"
      />
      <RainbowBorder>
        <Highlight
          {...defaultProps}
          theme={nightOwl}
          code={value}
          language={lang}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={className}
              css={{
                ...style,
                fontFamily: "Source Code Pro",
                background: "#1b1f2a",
                padding: `${fontSize}px`,
                margin: 0,
                backdropFilter: "blur(10px)"
              }}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </RainbowBorder>
    </div>
  );
};
export default CodeBlock;
