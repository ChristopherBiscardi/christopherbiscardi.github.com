/** @jsx jsx */
import React from "react";
import { Global, jsx, css } from "@emotion/core";
import Textfit from "react-textfit";

const stuff = preval`
  const fs = require('fs')
  const path = require('path')
  const val = fs.readFileSync(__dirname +'/rainbow-bg.png', 'base64')
  const interPlugin = path.dirname(require.resolve('gatsby-plugin-inter'))
  const interPath = interPlugin + '/inter/';
  const base64InterVarStraight = fs.readFileSync(interPath + "Inter-upright.var.woff2", 'base64')
  const base64InterVarItalic = fs.readFileSync(interPath + "Inter-italic.var.woff2", 'base64')
  const inter = fs.readFileSync(path.join(interPlugin, "inter/inter.css"), "utf-8")
                  .replace(/Inter-upright.var.woff2/g, "data:application/x-font-woff;charset=utf-8;base64," + base64InterVarStraight)
                  .replace(/Inter-italic.var.woff2/g, "data:application/x-font-woff;charset=utf-8;base64," + base64InterVarItalic)
  module.exports = {
    rainbowImg: val,
    inter,
    fontStyles: fs.readFileSync(path.join(interPlugin, "font-style.css"), "utf-8"),
    interPath
  }
`;
// /*      font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";*/

const RainbowBorder = ({ children, ...props }) => (
  <div
    css={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",

      position: "relative",
      padding: "1px",
      boxSizing: "border-box",

      background: "#1b1f2a",
      backgroundClip: "padding-box",
      border: "solid 1px transparent",
      borderRadius: "1rem",
      zIndex: 99,

      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
        margin: "-1px",
        // background: 'linear-gradient(to right, red, orange)',
        backgroundColor: "#ff1493",
        background:
          "linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)",
        borderRadius: "1rem"
      }
    }}
  >
    {children}
  </div>
);

const styles = css`
  * {
    box-sizing: border-box;
  }
`;

export default ({ title }) => {
  return (
    <div
      css={{
        background: "#1b1f2a",
        padding: "1rem",
        width: "800px",
        height: "400px"
      }}
    >
      <RainbowBorder>
        <div
          css={{
            background: "#1b1f2a",
            padding: "1rem",
            // textAlign: "center",
            // height: "200px",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%"
          }}
        >
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
            min={34}
            style={{
              width: "400px",
              color: "rgba(255, 255, 255, 0.86)"
            }}
          >
            {title}
          </Textfit>
        </div>
      </RainbowBorder>
    </div>
  );
};
