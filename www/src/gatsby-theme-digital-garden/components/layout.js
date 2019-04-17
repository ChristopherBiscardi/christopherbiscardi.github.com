import React from "react";
import { Global } from "@emotion/core";
import { css } from "theme-ui";
import { Layout, Main, Container } from "theme-ui/layout";
import Header from "gatsby-theme-digital-garden/src/components/header";
import WWWMDXProvider from "../../components/mdx-provider.js";

export default props => (
  <WWWMDXProvider>
    <Layout>
      <Header />
      <Main>
        <Container>{props.children}</Container>
      </Main>
    </Layout>
  </WWWMDXProvider>
);
