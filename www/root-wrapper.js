import React from "react";
import theme from "@sens8/tokens";
import { Sens8Context } from "@sens8/tokens";
import { MDXProvider } from "@mdx-js/react";
import Player from "react-player";

const components = {
  Video: props => (
    <Player
      {...props}
      css={{
        margin: "auto",
        paddingBottom: "1.5rem"
      }}
    />
  )
};

export default ({ children, ...props }) => (
  <Sens8Context.Provider value={theme}>
    <MDXProvider components={components}>{children}</MDXProvider>
  </Sens8Context.Provider>
);
