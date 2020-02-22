/* @jsx jsx */
import { render } from "preact";
import { jsx, Global } from "@emotion/preact-core";
import { MDXProvider } from "@mdx-js/preact";
import Page from "./pages/starting-a-new-node-project.js";
console.log(Page);
console.log("renderer");
render(
  <MDXProvider
    components={{
      p: props => (
        <p css={{ marginTop: "1rem", color: "#efefef" }} {...props} />
      ),
      li: props => (
        <li
          css={{ marginTop: "1rem", color: "#efefef", marginLeft: "1rem" }}
          {...props}
        />
      )
    }}
  >
    <div>
      <Global
        styles={{
          "*": { margin: 0, padding: "0" },
          body: { background: "#1fa9f4", padding: "1rem" }
        }}
      />
      <Page />
    </div>
  </MDXProvider>,
  document.getElementById("toast-page-section")
);
