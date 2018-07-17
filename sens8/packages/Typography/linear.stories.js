import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import mdx from "@mdx-js/mdx";
import styled from "react-emotion";

// example data
import Ch4 from "./ch4.mdx";
import Ex from "./markdown-sample.mdx";
import Text, {
  OL,
  UL,
  Sup,
  Sub,
  BlockQuote,
  Link,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6
} from "./linear";

const Divider = styled.hr`
  color: black;
`;

storiesOf("Typography|linear", module)
  .add("README", () => (
    <Fragment>
      <H1>Linear Typography</H1>
      <H5>Meant to be read</H5>
      <Text>
        Typography is a central part of any user interface, especially on the
        web. This set of components are meant to fulfill any typographic need,
        be it headings, display text, citations, emphasis, or quotes.
      </Text>
      <section>
        <Heading>Usage</Heading>
      </section>
    </Fragment>
  ))
  .add("kitchen sink", () => (
    <Fragment>
      <H1>Kitchen Sink</H1>
      <H2>Paragraphs</H2>
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
        h1: H1,
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
        h1: H1,
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

storiesOf("Typography|linear", module).add("Text", () => (
  <Fragment>
    <Text>some paragraph content</Text>
  </Fragment>
));
