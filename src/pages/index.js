import React, { Component, Fragment } from "react";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import theme from "@sens8/tokens";
import { Heading } from "sens8";
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
            background: theme.colors.background,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "center",
            width: "100vw"
          }}
        >
          <Heading
            level={1}
            css={{
              color: "#ff79c6"
            }}
          >
            Chris Biscardi
          </Heading>
        </div>
      </div>
    );
  }
}
