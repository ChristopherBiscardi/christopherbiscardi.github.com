import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import { injectGlobal } from "emotion";
import styled, { css } from "react-emotion";
import { Link } from "gatsby";
// Emotion supports different styling options, all of which are supported by gatsby-plugin-emotion out of the box

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

const Wrapper = styled.section`
  align-items: center;
  background: #282a36;
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
      <div>
        <Helmet>
          <title>Chris Biscardi</title>
          <meta name="description" content="Christopher Biscardi's website" />
          <meta name="referrer" content="origin" />
        </Helmet>
        <nav>
          <Link
            to="/another-page/"
            activeStyle={{
              color: "red"
            }}
            innerRef={el => {
              this.myLink = el;
            }}
          >
            Another page
          </Link>
        </nav>
        <Wrapper>
          <h1 className={title}>Chris Biscardi</h1>
        </Wrapper>
      </div>
    );
  }
}
