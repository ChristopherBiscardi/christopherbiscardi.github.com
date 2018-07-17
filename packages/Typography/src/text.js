import React, { Component } from "react";
import { BaseText } from "./base";

const BaseTextParagraph = BaseText.withComponent("p");

/**
 * Text is a low-level component that supports higher level APIs.
 */
export class Text extends Component {
  render() {
    const {
      as, // [override] render specific component
      children, // content of Text display
      fontFamily, // themable mono/serif/sans-serif
      inline,
      bold, // bold weight for font
      underline, // underline is for achors only
      italic, // emphasis
      ...props
    } = this.props;
    const C = inline ? BaseText : BaseTextParagraph;
    return <C {...props}>{children}</C>;
  }
}
