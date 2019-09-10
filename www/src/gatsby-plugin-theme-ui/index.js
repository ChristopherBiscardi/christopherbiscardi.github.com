import baseTheme from "gatsby-theme-blog/src/gatsby-plugin-theme-ui";

export default {
  ...baseTheme,
  // initialColorMode: `dark`,
  colors: {
    ...baseTheme.colors.modes.dark,
    background: "#1b1f2a",
    highlight: "#4c566a",
    primary: "#1fa9f4",
    prism: {
      ...baseTheme.colors.prism
    },
    modes: {
      dark: {
        ...baseTheme.colors,
        text: "#333",
        background: "#eceff4",
        primary: "#097ebd"
      }
    }
  },
  fonts: {
    body: "'Inter var', serif",
    heading: "'Inter var', system-ui, sans-serif",
    monospace: "'Source Code Pro', monospace"
  }
};
