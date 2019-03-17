/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";

export default () => (
  <Global
    styles={css`
      @import url("https://rsms.me/inter/inter.css");
    `}
  />
);
