/** @jsx jsx */
import React, { Component } from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { fontSize, color } from "styled-system";

const RawHeading = ({ is: Component = "h2", ...props }) => (
  <Component
    css={({ colors }) => css`
      font-family: "Inter UI";
      font-weight: 900;

      /* Typographic Color */
      line-height: 1;
      letter-spacing: 0;

      /* Hyphenation */
      hyphenate-limit-lines: 2;
      hyphenate-limit-char: 6 3 2;
      // legacy hyphenate-limit-char support
      hyphenate-limit-before: 3;
      hyphenate-limit-after: 2;
      hyphenate-limit-zone: 8%;
      hyphenate-limit-last: always;

      /* Ligatures */
      font-feature-settings: "dlig" 1, "hist" 1;
      @supports (font-variant-ligatures: discretionary-ligatures) {
        font-feature-settings: normal;
        font-variant-ligatures: discretionary-ligatures historical-ligatures;
      }
      /* numbers */
      font-variant-numeric: lining-nums;

      margin-top: 0;
      margin-bottom: 1em;
      color: ${colors.text};
    `}
    {...props}
  />
);

const levels = [1, 2, 3, 4, 5, 6];
export default class Heading extends Component {
  render() {
    const { children, level = 2, ...props } = this.props;
    const realLevel = level > 6 ? 6 : level < 1 ? 1 : level;
    return (
      <RawHeading is={`h${realLevel}`} {...props}>
        {children}
      </RawHeading>
    );
  }
}
