import React, { Fragment } from "react";
import { css } from "react-emotion";

import { Heading } from "sens8";

import SiteLayout from "../components/site-layout";

const title = css`
  font-size: 1.5em;
  color: #ff79c6;
  margin-bottom: 0.5em;

  a {
    color: #8be9fd;
  }
`;

const IndexPage = () => (
  <SiteLayout>
    <Heading level={1} className={title}>
      Sens8
    </Heading>
    <Heading level={5}>Design System</Heading>
  </SiteLayout>
);

export default IndexPage;
