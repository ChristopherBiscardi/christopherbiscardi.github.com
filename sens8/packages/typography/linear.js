/** @jsx jsx */
import React, { Component } from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { fontSize, color } from "styled-system";
import "./font";

export default class Text extends Component {
  render() {
    const { smallcaps, children, ...props } = this.props;
    return <P {...props}>{children}</P>;
  }
}

const lineHeight = 1.5;
export const P = styled("p")`
  ${color};

  font-family: "Inter UI", sans-serif;
  /* Reading Width */
  // width should be between 45 and 75 characters, 66 is preferred
  max-width: 38em;
  min-width: 23em;

  /* Typographic Color */
  line-height: ${lineHeight};

  /* Hyphenation */
  hyphenate-limit-lines: 2;
  hyphenate-limit-char: 6 3 2;
  // legacy hyphenate-limit-char support
  hyphenate-limit-before: 3;
  hyphenate-limit-after: 2;
  hyphenate-limit-zone: 8%;
  hyphenate-limit-last: always;

  /* Ligatures */
  font-feature-settings: "liga" 1;
  @supports (font-variant-ligatures: common-ligatures) {
    font-feature-settings: normal;
    font-variant-ligatures: common-ligatures;
  }

  /* Small Caps */
  // TODO: investigate how necessary \`font-feature-settings: "smcp" 1, "c2sc" 1\` is
  font-variant-caps: ${({ smallCaps }) =>
    smallCaps ? "all-small-caps" : undefined};
  ${textTransform};

  margin-bottom: 1.5em;
  & + & {
    text-indent: ${lineHeight}em;
    margin-top: 0;
  }

  // oldstyle numbs
  font-variant-numeric: oldstyle-nums;
`;

export const Sup = styled.sup`
  font-variant-position: super;
  @supports (font-variant-position: super) {
    & {
      vertical-align: inherit;
      font-size: inherit;
    }
  }
`;
P.defaultProps = {
  color: "text"
};
export const Sub = styled.sub`
  font-variant-position: sub;
  @supports (font-variant-position: sub) {
    & {
      vertical-align: inherit;
      font-size: inherit;
    }
  }
`;

// function buildFontFeatureSettings({smallCaps})

function textTransform({ smallCaps, textTransform, theme }) {
  // some fonts need to be lowercased for smallcaps to apply
  if (smallCaps && theme.fontRequiresSmallCapsLowercase) {
    return "lowercase";
  } else {
    return textTransform;
  }
}

function isQuoted({ quoted }) {
  if (quoted) {
    return css`
      quotes: "“","”","‘","’"
                &:before {
        content: open-quote;
        margin-left: -0.83ch;
      }
      &:after {
        content: close-quote;
      }
    `;
  }
}
const Quote = styled(P.withComponent("blockquote"))`
  ${isQuoted};
`;
export class BlockQuote extends Component {
  render() {
    // is= [pull, inline]
    const { is, quoted, children, citation: Citation } = this.props;
    return (
      <Quote>
        <Quote className={quoted}>{children}</Quote>
        {Citation && (
          <footer>
            <Citation />
          </footer>
        )}
      </Quote>
    );
  }
}

export const OL = props => (
  <ol
    {...props}
    css={({ colors }) => css`
      color: ${colors.text};
      // numerals in line with other linear text
      padding-left: 0;
      margin-left: 0;
      list-style: none;
      counter-reset: sens8-list;

      & li:before {
        counter-increment: sens8-list;
        content: counter(sens8-list);
        margin-left: -2em;
        margin-right: 1em;
      }
    `}
  />
);

export const UL = styled.ul`
  padding-left: ${lineHeight}em;
  /* Reading Width */
  // width should be between 45 and 75 characters, 66 is preferred
  max-width: 36.5em;
  min-width: 23em;
`;
class List extends Component {
  render() {
    const { indent } = this.props;

    return;
  }
}

export const Link = styled.a`
  text-decoration: none;
  border-bottom: 1px solid #ccc;
  @supports (text-decoration-skip: ink) {
    text-decoration: underline 1px solid #ccc;
    text-decoration-skip: ink;
    border-bottom: 0;
  }
`;
