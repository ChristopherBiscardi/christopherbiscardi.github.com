import React, { Component } from "react";
import styled from "@emotion/styled";
import { css, ClassNames } from "@emotion/core";
import { Link, StaticQuery, graphql } from "gatsby";

import { Heading } from "sens8";

const Wrapper = styled.section`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  padding: 1.5em;
`;

const Sidebar = styled.section`
  background: ${({ theme }) => theme.colors.background};
  border-right: 1px solid ${({ theme }) => theme.colors.background};
  border-left: 3px solid ${({ theme }) => theme.colors.background};
`;

class NavElement extends Component {
  render() {
    const { to, children } = this.props;
    return (
      <ClassNames>
        {({ css: classNameCSS, cx }) => {
          const active = classNameCSS`
            border-left: 5px solid #fff;
            padding-left: 0;
        `;

          return (
            <li>
              <Link
                to={to}
                css={({ colors }) =>
                  css`
                    display: flex;
                    flex: 1;
                    padding: 0.5em;
                    text-decoration: none;
                    color: ${colors.text};
                    margin-left: -3px;
                    padding-left: calc(3px+0.5em);
                    &:active {
                      border-left: 5px solid #fff;
                    }
                  `
                }
                getProps={({ isCurrent }) =>
                  isCurrent ? { className: active } : null
                }
              >
                {children}
              </Link>
            </li>
          );
        }}
      </ClassNames>
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
          <div
            css={css`
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
                      css={css`&:before{content: "${k2}"; padding-left: .5em; color: white;}`}
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
        )}
      />
    );
  }
}

export default SiteLayout;
