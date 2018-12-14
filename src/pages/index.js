import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import theme from "@sens8/tokens";
import { H1 } from "@sens8/component-typography/display";
import Nav from "../navigation";

export default class IndexPage extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Chris Biscardi</title>
          <meta name="description" content="Christopher Biscardi's website" />
          <meta name="referrer" content="origin" />
        </Helmet>
        <Nav />
        <div
          css={{
            alignItems: "center",
            background: theme.colors.backgroundLayers[3],
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "center",
            width: "100vw"
          }}
        >
          <H1
            css={{
              fontSize: "1.5em",
              color: "#ff79c6",
              marginBottom: "0.5em"
            }}
          >
            Chris Biscardi
          </H1>
        </div>
      </div>
    );
  }
}
