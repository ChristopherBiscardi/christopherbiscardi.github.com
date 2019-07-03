import React /*, { useState }*/ from "react";
// import WWWMDXProvider from "./components/mdx-provider";
//import Sidebar from "react-sidebar";
//import { useMedia } from "react-use";

import Nav from "./navigation";

const SiteLayout = ({ children, sidebar }) => {
  //  const [sidebarOpen, setSidebarOpenState] = useState(false);
  //  const isDesktop = useMedia(`(min-width: 800px)`);
  return (
    // <WWWMDXProvider>
    <section>
      <Nav />
      <main>{children}</main>
    </section>
    // </WWWMDXProvider>
  );
};

export default SiteLayout;
