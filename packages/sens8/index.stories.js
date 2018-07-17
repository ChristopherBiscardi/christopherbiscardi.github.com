import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Button, Text, Heading } from ".";

storiesOf("Sens8|*README", module).add("_", () => (
  <h1>Import some Sens8 markdown here</h1>
));

storiesOf("Sens8|Button", module)
  .add("basics", () => (
    <Fragment>
      <Heading>Buttons</Heading>
      <Button to="/whatever" onClick={action("clicked")}>
        default
      </Button>
      <Button size="large" is="dangerous" onClick={action("clicked")}>
        large
      </Button>
    </Fragment>
  ))
  .add("Text", () => <Text>Some text in a paragraph</Text>);
