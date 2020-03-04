/** @jsx jsx */
import { jsx } from "@emotion/preact-core";
import Header from "./header";

const Layout = ({ children, ...props }) => (
  <div>
    <Header />
    <div>{children}</div>
  </div>
);

export default Layout;
