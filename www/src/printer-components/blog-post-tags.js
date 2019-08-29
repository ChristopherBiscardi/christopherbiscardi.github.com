/** @jsx jsx */
import React from "react";
import { Global, jsx, css } from "@emotion/core";
import Textfit from "react-textfit";

const stuff = preval`
  const fs = require('fs')
  const path = require('path')

  const interPlugin = path.dirname(require.resolve('gatsby-plugin-inter'))
  const interPath = interPlugin + '/inter/';
  const base64InterVarStraight = fs.readFileSync(interPath + "Inter-upright.var.woff2", 'base64')
  const base64InterVarItalic = fs.readFileSync(interPath + "Inter-italic.var.woff2", 'base64')
  const inter = fs.readFileSync(path.join(interPlugin, "inter/inter.css"), "utf-8")
                  .replace(/Inter-upright.var.woff2/g, "data:application/x-font-woff;charset=utf-8;base64," + base64InterVarStraight)
                  .replace(/Inter-italic.var.woff2/g, "data:application/x-font-woff;charset=utf-8;base64," + base64InterVarItalic)
  module.exports = {
    rainbowImg: fs.readFileSync(__dirname +'/rainbow-bg.png', 'base64'),
    rainbowImgScreened: fs.readFileSync(__dirname +'/rainbow-bg-screened.png', 'base64'),
    inter,
    fontStyles: fs.readFileSync(path.join(interPlugin, "font-style.css"), "utf-8"),
    interPath
  }
`;
// /*      font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";*/

const styles = css`* {
    box-sizing: border-box;
  }
  /* Clip text element */
  .clip-text {
      font-size: 16px;
      font-weight: 600;
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
      background-image: url(data:image/png;base64,${stuff.rainbowImg})

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
    border: 2px solid rgba(0,0,0,.4);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: absolute;
    z-index: -1;
    top: 8px;
    right: 8px;
    bottom: 8px;
    left: 8px;
    background-image: url(data:image/png;base64,${stuff.rainbowImgScreened})
  }
  
  /* Use Background-size cover for photo background and no-repeat background */
  .clip-text,
  .clip-text:before {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 50% 50%;
  }`;

export default ({ tag }) => {
  return (
    <div className="clip-text">
      <Global
        styles={[
          styles,
          css`
            ${stuff.inter}
          `,
          css`
            ${stuff.fontStyles}
          `
        ]}
      />
      <Textfit
        mode="single"
        style={{
          height: "100px",
          textAlign: "center",
          marginTop: 80
        }}
      >
        {tag}
      </Textfit>
    </div>
  );
};
