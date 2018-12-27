/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";

export default ({
  // load regular by default
  regular = true,
  italic,
  medium,
  mediumItalic,
  bold,
  boldItalic,
  black,
  blackItalic
}) => (
  <Global
    styles={css`
      @font-face {
        font-family: "Inter UI";
        font-style: normal;
        font-weight: 400;
        src: url("font-files/Inter-UI-Regular.woff2?v=2.5") format("woff2"),
          url("font-files/Inter-UI-Regular.woff?v=2.5") format("woff");
      }
      @font-face {
        font-family: "Inter UI";
        font-style: italic;
        font-weight: 400;
        src: url("font-files/Inter-UI-Italic.woff2?v=2.5") format("woff2"),
          url("font-files/Inter-UI-Italic.woff?v=2.5") format("woff");
      }

      @font-face {
        font-family: "Inter UI";
        font-style: normal;
        font-weight: 500;
        src: url("font-files/Inter-UI-Medium.woff2?v=2.5") format("woff2"),
          url("font-files/Inter-UI-Medium.woff?v=2.5") format("woff");
      }
      @font-face {
        font-family: "Inter UI";
        font-style: italic;
        font-weight: 500;
        src: url("font-files/Inter-UI-MediumItalic.woff2?v=2.5") format("woff2"),
          url("font-files/Inter-UI-MediumItalic.woff?v=2.5") format("woff");
      }

      @font-face {
        font-family: "Inter UI";
        font-style: normal;
        font-weight: 700;
        src: url("font-files/Inter-UI-Bold.woff2?v=2.5") format("woff2"),
          url("font-files/Inter-UI-Bold.woff?v=2.5") format("woff");
      }
      @font-face {
        font-family: "Inter UI";
        font-style: italic;
        font-weight: 700;
        src: url("font-files/Inter-UI-BoldItalic.woff2?v=2.5") format("woff2"),
          url("font-files/Inter-UI-BoldItalic.woff?v=2.5") format("woff");
      }

      @font-face {
        font-family: "Inter UI";
        font-style: normal;
        font-weight: 900;
        src: url("font-files/Inter-UI-Black.woff2?v=2.5") format("woff2"),
          url("font-files/Inter-UI-Black.woff?v=2.5") format("woff");
      }
      @font-face {
        font-family: "Inter UI";
        font-style: italic;
        font-weight: 900;
        src: url("font-files/Inter-UI-BlackItalic.woff2?v=2.5") format("woff2"),
          url("font-files/Inter-UI-BlackItalic.woff?v=2.5") format("woff");
      }
    `}
  />
);