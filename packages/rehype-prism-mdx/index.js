const renderToString = require("preact-render-to-string");
const preact = require("preact");
const { h } = preact;
const Highlight = require("prism-react-renderer");
const visit = require("unist-util-visit");

const prismTheme = {
  plain: {
    color: "#d6deeb",
    backgroundColor: "#011627"
  },
  styles: [
    {
      types: ["changed"],
      style: {
        color: "rgb(162, 191, 252)",
        fontStyle: "italic"
      }
    },
    {
      types: ["deleted"],
      style: {
        color: "rgba(239, 83, 80, 0.56)",
        fontStyle: "italic"
      }
    },
    {
      types: ["inserted", "attr-name"],
      style: {
        color: "rgb(173, 219, 103)",
        fontStyle: "italic"
      }
    },
    {
      types: ["comment"],
      style: {
        color: "rgb(99, 119, 119)",
        fontStyle: "italic"
      }
    },
    {
      types: ["string", "url"],
      style: {
        color: "rgb(173, 219, 103)"
      }
    },
    {
      types: ["variable"],
      style: {
        color: "rgb(214, 222, 235)"
      }
    },
    {
      types: ["number"],
      style: {
        color: "rgb(247, 140, 108)"
      }
    },
    {
      types: ["builtin", "char", "constant", "function"],
      style: {
        color: "rgb(130, 170, 255)"
      }
    },
    {
      // This was manually added after the auto-generation
      // so that punctuations are not italicised
      types: ["punctuation"],
      style: {
        color: "rgb(199, 146, 234)"
      }
    },
    {
      types: ["selector", "doctype"],
      style: {
        color: "rgb(199, 146, 234)",
        fontStyle: "italic"
      }
    },
    {
      types: ["class-name"],
      style: {
        color: "rgb(255, 203, 139)"
      }
    },
    {
      types: ["tag", "operator", "keyword"],
      style: {
        color: "rgb(127, 219, 202)"
      }
    },
    {
      types: ["boolean"],
      style: {
        color: "rgb(255, 88, 116)"
      }
    },
    {
      types: ["property"],
      style: {
        color: "rgb(128, 203, 196)"
      }
    },
    {
      types: ["namespace"],
      style: {
        color: "rgb(178, 204, 214)"
      }
    }
  ]
};

module.exports = options => ast => {
  visit(ast, "element", tree => {
    if (tree.tagName === "code") {
      // store codestring for later
      tree.properties.codestring = tree.children[0].value;

      const lang =
        tree.properties.className &&
        tree.properties.className[0] &&
        tree.properties.className[0].split("-")[1];
      const highlightedCode = renderToString(
        h(
          Highlight.default,
          {
            ...Highlight.defaultProps,
            ...{
              code: tree.children[0].value.trim(),
              language: lang,
              theme: prismTheme
            }
          },
          ({ className, style, tokens, getLineProps, getTokenProps }) =>
            h(
              "pre",
              {
                className: className,
                style: { ...style, "background-color": "#11151d" }
              },
              tokens.map((line, i) =>
                h(
                  "div",
                  getLineProps({
                    line,
                    key: i
                  }),
                  line.map((token, key) =>
                    h(
                      "span",
                      getTokenProps({
                        token,
                        key
                      })
                    )
                  )
                )
              )
            )
        )
      );
      // console.log(highlightedCode);
      // render code to string
      tree.children = [
        {
          value: highlightedCode,
          type: "text"
        }
      ];
      // console.log(tree);
    }
    // console.log(tree);
    // tree.type = "codeblock";
  });
  // return ast;
};
