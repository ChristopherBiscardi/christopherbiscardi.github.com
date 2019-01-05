import React from "react";
import { css } from "@emotion/core";

import { Heading } from "sens8";

import SiteLayout from "../components/site-layout";

const IndexPage = () => (
  <SiteLayout>
    <Heading
      level={1}
      css={css`
        color: #ff79c6;
      `}
    >
      Sens8
    </Heading>
    <Heading level={5}>Design System</Heading>
  </SiteLayout>
);

export default IndexPage;
