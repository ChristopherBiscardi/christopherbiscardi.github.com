import React, { Component } from "react";
import palx from "palx";
import { space } from "styled-system";

import Nav from "./navigation";

export default class SiteLayout extends Component {
  render() {
    const { children, sidebar } = this.props;

    return (
      <section>
        <Nav />
        <div
          css={sidebar && { display: "grid", gridTemplateColumns: "200px 1fr" }}
        >
          <aside
            css={theme => ({
              background: theme.colors.backgroundLayers[3],
              height: "100%",
              borderRight: `1px solid ${theme.colors.backgroundLayers[2]}`
            })}
          >
            {sidebar}
          </aside>
          <main>{children}</main>
        </div>
      </section>
    );
  }
}
