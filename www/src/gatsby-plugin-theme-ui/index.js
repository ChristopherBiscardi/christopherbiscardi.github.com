import baseTheme from "gatsby-theme-blog/src/gatsby-plugin-theme-ui";

export default {
  ...baseTheme,
  initialColorMode: `dark`,
  colors: {
    ...baseTheme.colors,
    text: "#333",
    background: "#eceff4",
    primary: "#097ebd",
    modes: {
      dark: {
        ...baseTheme.colors.modes.dark,
        background: "#2e3440",
        highlight: "#4c566a",
        primary: "#1fa9f4"
      }
    }
  },
  fonts: {
    body: "serif",
    heading: "system-ui, sans-serif"
  }
};
