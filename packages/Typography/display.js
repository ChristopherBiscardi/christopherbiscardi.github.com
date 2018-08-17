import React, { Component } from "react";
import styled, { css } from "react-emotion";
import { fontSize, color } from "styled-system";

const cssHeadings = css`
  font-family: "Inter UI";
  font-weight: 900;

  /* Typographic Color */
  line-height: 1;
  letter-spacing: -0.02em;

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
`;
export const H1 = styled.h1`
  ${cssHeadings};
  ${color};
`;
H1.defaultProps = {
  color: "text"
};
export const H2 = styled.h2`
  ${cssHeadings};
  ${color};
`;
H2.defaultProps = {
  color: "text"
};
export const H3 = styled.h3`
  ${cssHeadings};
  ${color};
`;
H3.defaultProps = {
  color: "text"
};
export const H4 = styled.h4`
  ${cssHeadings};
  ${color};
`;
H4.defaultProps = {
  color: "text"
};
export const H5 = styled.h5`
  ${cssHeadings};
  ${color};
`;
H5.defaultProps = {
  color: "text"
};
export const H6 = styled.h6`
  ${cssHeadings};
  ${color};
`;
H6.defaultProps = {
  color: "text"
};

const levels = [H1, H2, H3, H4, H5, H6];
export default class Heading extends Component {
  render() {
    const { children, level, ...props } = this.props;
    let HeadingComponent = H2;
    if (level && levels[level - 1]) {
      HeadingComponent = levels[level - 1];
    }
    return <HeadingComponent {...props}>{children}</HeadingComponent>;
  }
}
