import React, { Fragment, Component } from "react";
import Helmet from "react-helmet";
import { injectGlobal } from "emotion";
import styled, { css } from "react-emotion";
import { ThemeProvider } from "emotion-theming";
import { Link, StaticQuery, graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/tag";

import theme from "@sens8/tokens";
import { Heading, Text } from "sens8";

import LiveCode from "./live-code";

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

injectGlobal`
  html, body {
    font-family: -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      "Roboto",
      "Roboto Light",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol";
  }
`;

//  align-items: center;
// justify-content: center;
// Using styled (similar API as styled-components)
const Wrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  padding: 1.5em;
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

const Sidebar = styled.section`
  background: ${({ theme }) => theme.colors.backgroundLayers[3]};
  border-right: 1px solid ${({ theme }) => theme.colors.backgroundLayers[2]};
  border-left: 3px solid ${({ theme }) => theme.colors.backgroundLayers[1]};
`;

const NavAnchor = styled(Link)`
  display: flex;
  flex: 1;
  padding: 0.5em;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  margin-left: -3px;
  padding-left: calc(3px+0.5em);
  &:active {
    border-left: 5px solid #fff;
  }
`;

const activeNavAnchor = css`
  border-left: 5px solid #fff;
  padding-left: 0;
`;

class NavElement extends Component {
  render() {
    const { to, children } = this.props;
    return (
      <li>
        <NavAnchor to={to} exact activeClassName={activeNavAnchor}>
          {children}
        </NavAnchor>
      </li>
    );
  }
}

class SiteLayout extends Component {
  mkTreeMap = data => {
    const treeMap = data.allMdx.edges.reduce((acc, cur) => {
      let curObj = acc;
      cur.node.parent.relativePath
        .slice(0, -4)
        .split("/")
        .forEach((v, i, arr) => {
          if (curObj[v] || acc[v]) {
            curObj = curObj[v] || acc[v];
          } else if (i < arr.length - 1) {
            curObj[v] = {};
            curObj = curObj[v];
          } else {
            curObj[v] = cur.node;
          }
        });
      return acc;
    }, {});

    return treeMap;
  };

  render() {
    const { children } = this.props;
    return (
      <StaticQuery
        query={graphql`
          query {
            allMdx(limit: 1000) {
              edges {
                node {
                  parent {
                    ... on File {
                      absolutePath
                      relativePath
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => (
          <ThemeProvider theme={theme}>
            <MDXProvider
              components={{
                h1: ({ children, ...props }) => (
                  <Heading level={1}>{children}</Heading>
                ),
                h2: ({ children, ...props }) => (
                  <Heading level={2}>{children}</Heading>
                ),
                h3: ({ children, ...props }) => (
                  <Heading level={3}>{children}</Heading>
                ),
                h4: ({ children, ...props }) => (
                  <Heading level={4}>{children}</Heading>
                ),
                h5: ({ children, ...props }) => (
                  <Heading level={5}>{children}</Heading>
                ),
                h6: ({ children, ...props }) => (
                  <Heading level={6}>{children}</Heading>
                ),
                p: Text,
                code: LiveCode
              }}
            >
              <Fragment>
                <Helmet>
                  <title>Sens8 Design System</title>
                  <meta name="description" content="Sens8 Docs" />
                  <meta name="referrer" content="origin" />
                </Helmet>
                <div
                  css={`
                    display: grid;
                    grid-template-columns: 200px 1fr;
                  `}
                >
                  <Sidebar>
                    <ul>
                      <NavElement to="/">Home</NavElement>
                    </ul>
                    {Object.entries(this.mkTreeMap(data)).map(([k, v]) => (
                      <div name={k} key={k}>
                        <Heading level="5">{k.toUpperCase()}</Heading>
                        {Object.entries(v).map(([k2, v2]) => (
                          <ul
                            key={k2}
                            name={k2}
                            css={`&:before{content: "${k2}"; padding-left: .5em; color: white;}`}
                          >
                            {Object.entries(v2).map(([k3, v3]) => (
                              <NavElement
                                to={"/" + v3.parent.relativePath.slice(0, -4)}
                                name={k3}
                                key={k3}
                              >
                                {k3}
                              </NavElement>
                            ))}
                          </ul>
                        ))}
                      </div>
                    ))}
                  </Sidebar>
                  <Wrapper>{children}</Wrapper>
                </div>
              </Fragment>
            </MDXProvider>
          </ThemeProvider>
        )}
      />
    );
  }
}

export default SiteLayout;
