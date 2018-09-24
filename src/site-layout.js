import React, { Component } from "react";
import palx from "palx";
import styled, { css } from "react-emotion";
import { space } from "styled-system";

import Nav from "./navigation";

const SidebarContainer = styled.div`
  background: ${({ theme }) => theme.colors.backgroundLayers[3]};
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.backgroundLayers[2]};
`;

const ContentContainer = styled.div`
  ${space};
`;

export default class SiteLayout extends Component {
  render() {
    const { children, sidebar } = this.props;

    return (
      <div>
        <Nav />
        <div
          className={
            sidebar &&
            css`
              display: grid;
              grid-template-columns: 200px 1fr;
            `
          }
        >
          <SidebarContainer>{sidebar}</SidebarContainer>
          <ContentContainer>{children}</ContentContainer>
        </div>
      </div>
    );
  }
}
