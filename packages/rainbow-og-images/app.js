import React from "react";
import { render } from "react-dom";
import Textfit from "react-textfit";

const renderFn = ($element, { title }) =>
  render(
    React.createElement(
      "div",
      { className: "clip-text" },
      React.createElement(
        Textfit,
        {
          style: { height: "250px" }
        },
        title
      )
    ),
    $element
  );

window.ogRender = renderFn;
