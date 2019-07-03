import React from "react";
import theme from "@sens8/tokens";
import { Global } from "@emotion/core";
import { Sens8Context } from "@sens8/tokens";

export default ({ children, ...props }) => (
  <Sens8Context.Provider value={theme}>
    <Global
      styles={{
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: "border-box"
        },
        body: {
          // background: theme.colors.background
        }
      }}
    />
    <div>{children}</div>
  </Sens8Context.Provider>
);
