/* @jsx h */
import { h, render } from "preact";
import Page from "./pages/a-css-in-js-of-my-own.js";
console.log(Page);
console.log("renderer");
render(h(Page), document.getElementById("toast-page-section"));
