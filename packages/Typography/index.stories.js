import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import mdx from "@mdx-js/mdx";
import styled from "react-emotion";

// example data
import Ch4 from "./ch4.mdx";
import { Text, Heading } from ".";

const Divider = styled.hr`
  color: black;
`;

storiesOf("Typography|*", module)
  .add("README", () => (
    <Fragment>
      <Heading>Typography</Heading>
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
      <Heading>Kitchen Sink</Heading>
    </Fragment>
  ))
  .add("markdown example", () => (
    <Ch4
      components={{
        h1: Heading,
        p: Text
      }}
    />
  ));
storiesOf("Typography|Heading", module)
  .add("usage", () => (
    <Fragment>
      <Heading>Heading</Heading>
    </Fragment>
  ))
  .add("levels", () => (
    <Fragment>
      <Heading level="1">Level 1</Heading>
      <Heading level="2">Level 2</Heading>
      <Heading level="3">Level 3</Heading>
      <Heading level="4">Level 4</Heading>
      <Heading level="5">Level 5</Heading>
      <Heading level="6">Level 6</Heading>
    </Fragment>
  ));

storiesOf("Typography|Text", module).add("Text", () => (
  <Fragment>
    <Text>some paragraph content</Text>
  </Fragment>
));
