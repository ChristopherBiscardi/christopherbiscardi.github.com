import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import mdx from "@mdx-js/mdx";
import styled from "react-emotion";

import H from "./display";
import Text from "./linear";

const Divider = styled.hr`
  color: black;
`;

storiesOf("Typography|display", module)
  .add("README", () => (
    <Fragment>
      <H level={1}>Display Typography</H>
      <H level={5}>Meant to be seen, like an image</H>
      <Text>
        Typography is a central part of any user interface, especially on the
        web. This set of components are meant to be displayed as headings and in
        hero sections
      </Text>
      <section>
        <H>Usage</H>
      </section>
    </Fragment>
  ))
  .add("kitchen sink", () => (
    <Fragment>
      <H level={1}>Kitchen Sink</H>
      <H>Paragraphs</H>
      <Text>
        Here’s how it all got started. The goal with&nbsp;
        <Link href="https://gatsbymanor.com">Gatsby Manor</Link> (a separate
        project, unaffiliated with the Gatsby core team) is to create
        professional designed Gatsby starters to give your site a clean, modern
        look the moment you create a new project. While creating our newest
        starter&nbsp;
        <Link href="https://gatsbymanor.com/demo/eventually">
          gatsby-starter-eventually
        </Link>, I wanted to organize the directory structure of the project to
        better fit my workflow.
      </Text>
      <Text>
        Gatsby core automatically turns React components in{" "}
        <strong>src/pages</strong> into pages. Prior to this plugin, that
        functionality was only available to Gatsby core as an internal plugin.
        There was no way to have a different folder automatically create pages
        from components because the default <strong>src/pages</strong>
        path was hardcoded. The side effect of this behavior is that you have a
        hard time creating folder structures that best fit your needs. If you
        wanted all your javascript to live in a single folder, you would lose
        the ability to automatically create pages.
      </Text>
      <OL>
        <li>one thing</li>
        <li>two things</li>
        <li>three things</li>
      </OL>
    </Fragment>
  ))
  .add("linear markdown example", () => (
    <Ch4
      components={{
        H1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        p: Text,
        ol: OL,
        ul: UL,
        sub: Sub,
        sup: Sup,
        blockquote: BlockQuote
      }}
    />
  ))
  .add("markdown example", () => (
    <Ex
      components={{
        H1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,
        p: Text,
        ol: OL,
        sub: Sub,
        sup: Sup,
        blockquote: BlockQuote
      }}
    />
  ));
