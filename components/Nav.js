import React, { Component } from "react";
import { NavLink as Link } from "react-router-dom";
import Headroom from "react-headroom";
import styles from "./Nav.css";

import { css } from "glamor";

const gWrapper = css({
  background: "white"
});

const gNav = css({
  display: "flex",
  flexFlow: "row wrap",
  maxWidth: "1440px",
  marginLeft: "auto",
  marginRight: "auto",
  minHeight: "2rem"
});

const gItems = css({
  listStyle: "none",
  flex: "0 0 auto",
  width: "calc(99.99% * 10/12 - (30px - 30px * 10/12))",
  display: "flex",
  padding: 0,
  margin: 0,
  justifyContent: "center",
  alignItems: "center",
  ":nth-child(1n)": {
    marginRight: "30px",
    marginLeft: 0
  },
  ":last-child": {
    marginRight: 0
  },
});

const gLi = css({
  marginLeft: "1rem",
  fontSize: ".8rem",
  borderTop: "1px solid transparent",
  ":hover": {
    borderColor: "#202B31"
  },
  "@media only screen and (max-width: 480px)": {
    fontSize: "1rem"
  }
});

const gItemLink = css({
  color: "#010d13",
  backgroundColor: "transparent",
  backgroundRepeat: "repeat-x",
  backgroundSize: "1px 1px",
  backgroundImage: "linear-gradient(to bottom,#202B31 75%,#202B31 75%)",
  textShadow: "-2px 1px 0 #fcfcfc,-1px 1px 0 #fcfcfc,0 1px 0 #fcfcfc,1px 1px 0 #fcfcfc,2px 1px 0 #fcfcfc,-1px -1px 0 #fcfcfc,1px -1px 0 #fcfcfc,-1px 0 0 #fcfcfc,1px 0 0 #fcfcfc",
  backgroundPosition: "0 99.9%",
  textDecoration: "none"
});

const gLogoWrapper = css({
  flex: "0 0 auto",
  width: "calc(99.99% * 2/12 - (30px - 30px * 2/12))",
  display: "flex",
  alignItems: "center",
  paddingLeft: "1rem",
  ":nth-child(1n)": {
    marginRight: "30px",
    marginLeft: 0
  }
});

const gLogo = css({
  width: "1.8rem",
  height: "1.8rem"
});

export default class Nav extends Component {
  render() {
    return (
      //      <Headroom>
      (
        <div {...gWrapper}>
          <nav {...gNav}>
            <Link to="/" {...gLogoWrapper}>
              <img {...gLogo} src={"/" + require("./cb-logo-2014.png")} />
            </Link>
            <ul {...gItems}>
              {[
                (
                  <Link
                    to="/posts/"
                    {...gItemLink}
                    activeClassName={styles.active}
                  >
                    Posts
                  </Link>
                ),
                (
                  <a
                    href="https://github.com/ChristopherBiscardi/ama/issues?q=is%3Aissue+is%3Aclosed"
                    {...gItemLink}
                  >
                    AMA
                  </a>
                ),
                (
                  <Link
                    to="/books/"
                    {...gItemLink}
                    activeClassName={styles.active}
                  >
                    Books
                  </Link>
                ),
                (
                  <Link
                    to="/projects/"
                    {...gItemLink}
                    activeClassName={styles.active}
                  >
                    Projects
                  </Link>
                ),
                (
                  <Link
                    to="/about/"
                    {...gItemLink}
                    activeClassName={styles.active}
                  >
                    About
                  </Link>
                )
              ].map(el => <li {...gLi}>{el}</li>)}
            </ul>
          </nav>
        </div>
      )
      //      </Headroom>
    );
  }
}
