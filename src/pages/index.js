import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import { injectGlobal } from "emotion";
import styled, { css } from "react-emotion";
import { Link } from "gatsby";
import Box from "superbox/emotion";
import { ThemeProvider } from "emotion-theming";
import theme from "@sens8/tokens";

import { H1 } from "@sens8/component-typography/display";
import Nav from "../navigation";

const Wrapper = styled.section`
  align-items: center;
  background: ${({ theme }) => theme.colors.backgroundLayers[3]};
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

// Using css with template literal
const title = css`
  font-size: 1.5em;
  color: #ff79c6;
  margin-bottom: 0.5em;
  a {
    color: #8be9fd;
  }
`;

// Using css with object
const subtitle = css({
  color: `#bd93f9`
});

export default class IndexPage extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Box>
          <Helmet>
            <title>Chris Biscardi</title>
            <meta name="description" content="Christopher Biscardi's website" />
            <meta name="referrer" content="origin" />
          </Helmet>
          <Nav />
          <Wrapper>
            <H1 className={title}>Chris Biscardi</H1>
          </Wrapper>
        </Box>
      </ThemeProvider>
    );
  }
}
