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

const StyledLivePreview = styled(LivePreview, {
  // prop forwarding blocklist
  shouldForwardProp: prop =>
    ["isEditorMode"].includes(prop) ? false : isPropValid(prop)
})`
  border: 1px solid transparent;
  outline: 1px solid transparent;
  border-radius: 3px;
  padding: 1.5em;
  ${({ isEditorMode }) =>
    isEditorMode
      ? css`
          border-color: #343434;
          outline: 1px solid #232323;
        `
      : css`
          &:hover {
            border-color: #343434;
            outline: 1px solid #232323;
            position: relative;
            cursor: pointer;
            user-select: none;
            &:before {
              content: "code";
              position: absolute;
              right: 0;
              top: 0;
              padding: 0.5em;
              background: #ffffff34;
            }
            &:after {
              position: absolute;
              pointer-events: none;
              content: "";
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              border-radius: 5px;
              box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
              background-image: linear-gradient(
                -45deg,
                rgba(255, 255, 255, 0.4),
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0) 50%
              );
              -webkit-mask-image: linear-gradient(#000, transparent);
            }
          }
        `};
`;

const t = ({ children, metaString, ...props }) => {
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
      `<Fragment>
${children}</Fragment>`,
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
      <StyledLivePreview
        isEditorMode={isEditorMode}
        onClick={e => {
          console.log(isEditorMode);
          setIsEditorMode(true);
          console.log(isEditorMode);
        }}
      />
    </LiveProvider>
  );
};
export default t;
