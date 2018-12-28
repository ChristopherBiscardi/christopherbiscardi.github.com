import React, { Component, useState } from "react";
import palx from "palx";
import { space } from "styled-system";
import Sidebar from "react-sidebar";
import { useMedia } from "react-use";

import Nav from "./navigation";

const SiteLayout = ({ children, sidebar }) => {
  const [sidebarOpen, setSidebarOpenState] = useState(false);
  const isDesktop = useMedia(`(min-width: 800px)`);
  return (
    <section>
      <Sidebar
        sidebar={sidebar}
        open={sidebarOpen}
        docked={isDesktop}
        onSetOpen={setSidebarOpenState}
      >
        <Nav />
        <main>{children}</main>
      </Sidebar>
    </section>
  );
};

export default SiteLayout;
