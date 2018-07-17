import React, { Fragment } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from ".";

storiesOf("Button", module)
  .add("sizes", () => (
    <Fragment>
      <Button onClick={action("clicked")} m="3">
        default
      </Button>
      <Button size="large" onClick={action("clicked")}>
        large
      </Button>
    </Fragment>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
