/** @jsx jsx */
import React from "react";
import { width, fontSize, color } from "styled-system";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import isPropValid from "@emotion/is-prop-valid";

const sizes = {
  small: css`
    padding: 0 7px;
    font-size: 14px;
    border-radius: 4px;
    height: 24px;
  `,
  default: css`
    padding: 0 15px;
    font-size: 14px;
    border-radius: 4px;
    height: 32px;
  `,
  large: css`
    padding: 0 15px;
    font-size: 16px;
    border-radius: 4px;
    height: 40px;
  `
};

const variants = {
  default: css`
    color: #e9ecee;
    border: 1px solid #e9ecee;
    background-color: transparent;
  `,
  filled: css`
    border: 1px solid transparent;
    color: #e9ecee;
    background-color: #fff;
    border-color: #d9d9d9;
  `,
  dashed: css`
    color: #e9ecee;
    background-color: #fff;
    border-color: #d9d9d9;
    border-style: dashed;
  `
};
const sizeProp = ({ size, theme }) => sizes[size] || sizes["default"];
const isProp = ({ is, theme }) => variants[is] || variants["default"];

export default ({ size, is, to, as, children, ...props }) => {
  let Base = BaseButton;
  if (as) {
    // Want to support React Router Link, etc
    Base = BaseButton.withComponent(as);
  } else if (to) {
    // if there's an href, it has to be an achor
    Base = BaseButton.withComponent("a");
  }

  return (
    <Base is={is} href={to} size={size} {...props}>
      {children}
    </Base>
  );
};
const BaseButton = styled("button", {
  // don't forward the is prop
  shouldForwardProp: prop => (["is"].includes(prop) ? false : isPropValid(prop))
})`
line-height: 1.5;
display: inline-block;
font-weight: 400;
text-align: center;
touch-action: manipulation;
cursor: pointer;
background-image: none;
white-space: nowrap;

user-select: none;
transition: all .3s cubic-bezier(.645,.045,.355,1);
position: relative;
    box-shadow: 0 2px 0 rgba(0,0,0,.015);
    ${fontSize}
    ${color}
${sizeProp}
${isProp}
`;
