import React, { Component, Fragment } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import styled, { css } from "react-emotion";

import * as sens8 from "sens8";

const StyledLivePreview = styled(LivePreview)`
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

export default class LiveCode extends Component {
  state = { isEditorMode: false };
  onClick = () => {
    this.setState({ isEditorMode: true });
  };
  render() {
    console.log(this.props);
    const { children, ...props } = this.props;
    return (
      <LiveProvider
        code={`<Fragment>
${children}</Fragment>`}
        {...props}
        scope={{ ...sens8, Fragment, Component }}
      >
        {this.state.isEditorMode && (
          <Fragment>
            <LiveEditor />
            <LiveError />
          </Fragment>
        )}
        <StyledLivePreview
          isEditorMode={this.state.isEditorMode}
          onClick={this.state.isEditorMode ? undefined : this.onClick}
        />
      </LiveProvider>
    );
  }
}
