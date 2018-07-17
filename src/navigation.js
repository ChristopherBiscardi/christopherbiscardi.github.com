import React, { Component } from "react";
import { Link as GLink } from "gatsby";
import styled, { css } from "react-emotion";

const Link = styled(GLink)`
  font-family: "Inter UI", sans-serif;

  text-decoration: none;
  border-bottom: 1px solid #bbbebf;

  padding: 0.5rem;
  font-weight: 400;
  font-size: 16px;
  color: #bbbebf;
  display: inline-block;
`;

const activeNavLink = css`
  color: #8be9fd;
`;
export default class Nav extends Component {
  render() {
    return (
      <nav
        css={`
          background: #282a36;
          display: flex;
        `}
      >
        <ul
          css={`
            display: flex;
            list-style-type: none;
          `}
        >
          <li>
            <Link to="/" exact activeClassName={activeNavLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" activeClassName={activeNavLink}>
              Posts
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
