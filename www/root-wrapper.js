import React from "react";
// import theme from "@sens8/tokens";
// import { Global } from "@emotion/core";
// import { Sens8Context } from "@sens8/tokens";
import { MDXProvider } from "@mdx-js/react";

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
  <MDXProvider components={components}>{children}</MDXProvider>
);
