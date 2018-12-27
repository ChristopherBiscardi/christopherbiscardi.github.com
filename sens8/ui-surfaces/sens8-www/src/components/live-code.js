import React, { Component, Fragment, useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import styled from "@emotion/styled";
import isPropValid from "@emotion/is-prop-valid";
import { css } from "@emotion/core";
import prettier from "prettier/standalone";
const debug = require("debug")("sens8-www:live-code");

import * as sens8 from "sens8";

const plugins = [
  require("prettier/parser-babylon"),
  require("prettier/parser-graphql")
];

const LiveCode = ({ children, metaString, ...props }) => {
  const [isEditorMode, setIsEditorMode] = useState(false);
  debug("isEditorMode", isEditorMode);

  let code = children;

  if (
    props.className.includes("language-js") ||
    props.className.includes("language-jsx") ||
    props.className.includes("language-javascript")
  ) {
    debug("using JavaScript");
    //apply prettier to input
    code = prettier.format(
      `<>
${children}</>`,
      { parser: "babylon", plugins }
    );
  }

  return (
    <LiveProvider
      code={code}
      {...props}
      scope={{ ...sens8, Fragment, Component }}
    >
      {isEditorMode && (
        <Fragment>
          <LiveEditor />
          <LiveError />
        </Fragment>
      )}
      <div css={{ display: "flex", marginTop: "1rem" }}>
        <div
          css={{
            display: "flex",
            marginRight: "1rem"
          }}
          onClick={e => {
            setIsEditorMode(true);
          }}
        >
          <sens8.Button>edit</sens8.Button>
        </div>
        <LivePreview
          css={{
            border: "1px solid transparent",
            outline: "1px solid transparent",
            borderRadius: "3px",
            flex: 1
          }}
        />
      </div>
    </LiveProvider>
  );
};

export default LiveCode;
