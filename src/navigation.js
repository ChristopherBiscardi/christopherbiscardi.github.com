import React, { Component, Fragment } from "react";
import { Link as GLink } from "gatsby";
import styled, { css } from "react-emotion";

const Link = ({ children, ...props }) => (
  <GLink
    {...props}
    className={css`
      font-family: "Inter UI", sans-serif;

      text-decoration: none;
      border-bottom: 1px solid #bbbebf;

      padding: 0.5rem;
      font-weight: 400;
      font-size: 16px;
      color: #bbbebf;
      display: inline-block;
    `}
    getProps={({ isCurrent }) =>
      isCurrent
        ? {
            className: css`
              color: #8be9fd;
            `
          }
        : null
    }
  >
    {children}
  </GLink>
);

export default class Nav extends Component {
  render() {
    return (
      <Fragment>
        <div
          css={`
            height: 36px;
          `}
        />
        <nav
          css={`
            background: #282a36;
            display: flex;
            position: fixed;
            width: 100%;
            margin-top: -36px;
          `}
        >
          <ul
            css={`
              display: flex;
              list-style-type: none;
            `}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          </ul>
        </nav>
      </Fragment>
    );
  }
}
