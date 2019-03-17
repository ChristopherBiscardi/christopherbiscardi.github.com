/** @jsx jsx */
import React, { Component } from "react";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { fontSize, color } from "styled-system";
import { useTextColor, useLinkColor } from "@sens8/tokens";
import "./font";

export default class Text extends Component {
  render() {
    const { smallcaps, children, ...props } = this.props;
    return <P {...props}>{children}</P>;
  }
}

const lineHeight = 1.5;
export const P = props => {
  const textColor = useTextColor();
  return (
    <p
      {...props}
      css={theme => [
        textTransform(props),
        css`
          color: ${textColor};

          font-family: "Inter", sans-serif;
          @supports (font-variation-settings: normal) {
            & {
              font-family: "Inter var", sans-serif;
            }
          }
          /* Reading Width */
          // width should be between 45 and 75 characters, 66 is preferred
          max-width: 38em;
          //  min-width: 23em;

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
          font-variant-caps: ${props.smallCaps ? "all-small-caps" : undefined};

          margin-bottom: 1.5em;
          & + & {
            text-indent: ${lineHeight}em;
            margin-top: 0;
          }

          // oldstyle numbs
          font-variant-numeric: oldstyle-nums;
        `
      ]}
    />
  );
};

export const Sup = props => {
  const textColor = useTextColor();
  return (
    <sup
      {...props}
      css={`
        color: ${textColor};
        font-variant-position: super;
        @supports (font-variant-position: super) {
          & {
            vertical-align: inherit;
            font-size: inherit;
          }
        }
      `}
    />
  );
};

export const Sub = props => {
  const textColor = useTextColor();
  return (
    <sub
      css={`
        color: ${textColor};
        font-variant-position: sub;
        @supports (font-variant-position: sub) {
          & {
            vertical-align: inherit;
            font-size: inherit;
          }
        }
      `}
    />
  );
};

// function buildFontFeatureSettings({smallCaps})

function textTransform({ smallCaps, textTransform, theme }) {
  // some fonts need to be lowercased for smallcaps to apply
  if (smallCaps && theme.fontRequiresSmallCapsLowercase) {
    return "lowercase";
  } else {
    return textTransform;
  }
}

const Quote = ({ quoted, ...props }) => {
  return (
    <blockquote
      {...props}
      css={
        quoted
          ? css`
              quotes: "“","”","‘","’"
                &:before {
                content: open-quote;
                margin-left: -0.83ch;
              }
              &:after {
                content: close-quote;
              }
            `
          : {}
      }
    />
  );
};

// is= [pull, inline]
export const BlockQuote = ({ is, quoted, children, citation }) => {
  const textColor = useTextColor();
  return (
    <Quote
      quoted
      css={{
        color: textColor,
        borderLeft: `2px solid ${textColor}`,
        paddingLeft: "1rem"
      }}
    >
      {children}
      {citation && <footer>{citation}</footer>}
    </Quote>
  );
};

export const OL = props => {
  const textColor = useTextColor();
  return (
    <ol
      {...props}
      css={css`
        color: ${textColor};
        // numerals in line with other linear text
        padding-left: 0;
        margin-left: 0;
        list-style: none;
        counter-reset: sens8-list;

        & li:before {
          counter-increment: sens8-list;
          content: counter(sens8-list);
          margin-left: -${lineHeight}em;
          margin-right: 1em;
        }
      `}
    />
  );
};

export const UL = props => {
  const textColor = useTextColor();
  return (
    <ul
      {...props}
      css={{
        color: textColor,
        paddingLeft: `${lineHeight}em`,
        // numerals in line with other linear text
        paddingLeft: 0,
        marginLeft: 0
      }}
    />
  );
};

class List extends Component {
  render() {
    const { indent } = this.props;

    return;
  }
}

export const Link = ({ as: Component = "a", ...props }) => {
  const linkColor = useLinkColor();
  return (
    <Component
      {...props}
      css={css`
        color: ${linkColor};
        text-decoration: none;
        border-bottom: 1px solid ${linkColor};
        @supports (text-decoration-skip: ink) {
          text-decoration: underline 1px solid ${linkColor};
          text-decoration-skip: ink;
          border-bottom: 0;
        }
      `}
    />
  );
};
