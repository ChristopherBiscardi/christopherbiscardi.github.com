/** @jsx jsx */
import React from "react";
import { Global, jsx, css } from "@emotion/core";
import Textfit from "react-textfit";

const rainbowImg = preval`
  const fs = require('fs')
  const val = fs.readFileSync(__dirname +'/rainbow-bg.png', 'utf8')
  module.exports = {
    val: val.toString('base64')
  }
`;

// console.log("rainbow", rainbowImg.val);
const styles = `* {
    box-sizing: border-box;
  }
  /* Clip text element */
  .clip-text {
      font-family: sans-serif;
      font-size: 16px;
      font-weight: bold;
      line-height: 1;
      position: relative;
      display: inline-block;
      margin: 8px;
      padding: 32px 48px;
      text-align: left;
      /* Color fallback */
      color: #fff;
      -webkit-background-clip: text;
  
      -webkit-text-fill-color: transparent;

      box-sizing: border-box;
      width: 600px;
      height: 314px;
      background-image: url(data:image/png;base64,${rainbowImg.val})

  }
  
  .clip-text:before,
  .clip-text:after {
      position: absolute;
      content: '';
  }
  
  /* Background */
  .clip-text:before {
      z-index: -2;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: inherit;
  }
  
  /* Text Background (black zone) */
  .clip-text:after {
    border: 5px solid black;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
      position: absolute;
      z-index: -1;
      top: 16px;
      right: 16px;
      bottom: 16px;
      left: 16px;
      background-color: #000;
  }
  
  /* Change the background position to display letter when the black zone isn't here */
  .clip-text--no-textzone:before {
      background-position: -.75em 0;
  }
  
  .clip-text--no-textzone:after {
      content: none;
  }
  
  /* Use Background-size cover for photo background and no-repeat background */
  .clip-text,
  .clip-text:before {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 50% 50%;
  }`;

export default ({ title }) => {
  return (
    <div
      css={css`
      font-family: sans-serif;
      font-size: 16px;
      font-weight: bold;
      line-height: 1;
      position: relative;
      display: inline-block;
      margin: 8px;
      padding: 32px 48px;
      text-align: left;
      /* Color fallback */
      color: #fff;
      -webkit-background-clip: text;
  
      -webkit-text-fill-color: transparent;

      box-sizing: border-box;
      width: 600px;
      height: 314px;
      background-image: url(data:image/png;base64,${rainbowImg.val});

      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: 50% 50%;

  
  /* Text Background (black zone) */
  &:after {
          position: absolute;
      content: '';
    border: 5px solid black;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
      position: absolute;
      z-index: -1;
      top: 16px;
      right: 16px;
      bottom: 16px;
      left: 16px;
      background-color: #000;
  }
  
  /* Use Background-size cover for photo background and no-repeat background */

  &:before {
              position: absolute;
      content: '';
      z-index: -2;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: inherit;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 50% 50%;
  }`}
    >
      <Textfit style={{ height: "250px" }}>{title}</Textfit>
    </div>
  );
};
