/** @jsx jsx */
import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import nightOwl from "prism-react-renderer/themes/nightOwl";
import { jsx } from "@emotion/core";
import { getMonth } from "date-fns";

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec"
];
const imageCollections = {
  default: "8541457",
  oct: "8714217"
};
const today = new Date();
const imageCollection =
  imageCollections[months[getMonth(today)]] || imageCollections.default;
const fontSize = 20;
const CodeBlock = ({ lang, value }) => {
  return (
    <div
      css={{
        fontSize: `${fontSize}px`,
        display: "inline-block",
        position: "relative",
        padding: `${fontSize}px`,
        overflow: "hidden"
      }}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap"
        rel="stylesheet"
      />
      <div
        css={{
          backgroundImage: `url(https://source.unsplash.com/collection/${imageCollection})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          width: "calc(100% + 4px)",
          margin: `calc(-${fontSize}px - 2px)`,
          height: "calc(100% + 4px)",
          filter: "blur(2px)"
        }}
      ></div>
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
              backgroundColor: "rgba(1, 22, 39, .6)",
              padding: `${fontSize}px`,
              margin: `${fontSize}px`,
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
    </div>
  );
};
export default CodeBlock;
