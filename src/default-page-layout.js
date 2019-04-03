import React from "react";
import { Heading } from "@sens8/component-typography";
import SiteLayout from "./site-layout";
import { useLayers } from "@sens8/tokens";

export default props => {
  const backgroundColor = useLayers(1);
  return (
    <SiteLayout sidebar={<aside css={{ position: "fixed" }}>some stuff</aside>}>
      <div
        css={{
          display: "flex",
          background: backgroundColor,
          height: "30vh",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem"
        }}
      >
        <Heading level={1}>Media</Heading>
      </div>
      <div
        data-id="wrapper"
        css={{
          "& > div > :not(pre)": {
            width: "38rem",
            marginLeft: "auto",
            marginRight: "auto"
          },
          "& code": {
            maxWidth: "38rem"
          }
        }}
      >
        {props.children}
      </div>
    </SiteLayout>
  );
};
