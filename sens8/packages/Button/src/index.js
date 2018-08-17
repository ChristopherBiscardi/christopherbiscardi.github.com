import React from "react";
import { width, fontSize, color } from "styled-system";
import styled, { css } from "react-emotion";

const sizes = {
  default: css`
    padding: 0.2em 1rem;
  `,
  large: css`
    padding: 10px 32px;
  `
};
const sizeProp = ({ size, theme }) => sizes[size] || sizes["default"];
export default ({ size, is, to, as, children, ...props }) => {
  const Base = do {
    if (as) {
      // Want to support React Router Link, etc
      BaseButton.withComponent(as);
    } else if (to) {
      // if there's an href, it has to be an achor
      BaseButton.withComponent("a");
    } else {
      BaseButton;
    }
  };

  return (
    <Base is={is} {...{ href: to }} size={size} {...props}>
      {children}
    </Base>
  );
};
const BaseButton = styled.button`
font-size: 1rem;
        overflow: hidden;
        border: 1px solid white;
	background: none;
	cursor: pointer;
        display: inline-block;
        outline: none;
	position: relative;
	transition: all 0.3s;

&:hover,
&:active {
	color: #0e83cd;
}
&:before {
    content: '';
    background: #1fa9f4;
    height: calc(100% - 2px);
    width: calc(100% - 2px);
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid #0c9eee;
    z-index: -1;
}
&:focus:after,
&:hover:after {
	height: 260%;
	opacity: 1;
}

&:active:after {
	height: 400%;
	opacity: 1;
}

     &:after {
	content: '';
	position: absolute;
	z-index: -1;
	transition: all 0.3s;

  width: 100%;
	height: 0;
	top: 50%;
	left: 50%;
	background: #fff;
	opacity: 0;
	transform: translateX(-50%) translateY(-50%) rotate(45deg);
}
    ${width}
${fontSize}  
  ${color}
${sizeProp}
`;

/**
   &::before {
   position: absolute;
   top: -2px;
   left: -2px;
   content: "";
   width: calc(100%+4px);
   height: calc(100%+4px);
box-shadow: 0 0 0 2px black;
border-radius: 3px;
   }
 */
