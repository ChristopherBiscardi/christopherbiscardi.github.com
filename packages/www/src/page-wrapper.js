/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import Logo from "./components/logos/logo-full.js";
import { Helmet } from "react-helmet";
import { MDXProvider } from "@mdx-js/preact";
import { Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
// import Highlight, { defaultProps } from "prism-react-renderer";

const maxWidth = "800px";
const textColor = "rgba(255, 255, 255, 0.86)";

const nav = [
  { displayName: "Garden", url: "/garden" },
  { displayName: "Party Corgi", url: "https://partycorgi.com" },
  // { displayName: "Tags", url: "/tags" },
  { displayName: "Discord", url: "https://discord.gg/S9Gdagv" },
  {
    displayName: "Newsletter",
    url: "https://pages.convertkit.com/04c24646a3/c136f814fc"
  }
];

const navLinkStyles = {
  color: "#eef1f7",
  fontWeight: 250,
  fontSize: ".9rem",
  textDecoration: "none"
};

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

const Header = props => (
  <header
    css={{
      display: "flex",
      height: "75px",
      maxWidth,
      margin: "auto",
      marginTop: "30px",
      flexWrap: "wrap"
    }}
  >
    <div>
      <a href="/" css={{ display: "flex", flex: 1, marginTop: "7px" }}>
        <Logo />
      </a>
    </div>
    <nav css={{ display: "flex", flex: 1 }}>
      <ul
        css={{
          listStyleType: "none",
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          flexWrap: "wrap",
          padding: 0,
          marginTop: "-2px"
        }}
      >
        {nav.map(({ displayName, url }) => {
          return (
            <li
              key={displayName + url}
              css={{ marginLeft: "2rem", marginTop: "18px" }}
            >
              <a href={url} css={navLinkStyles}>
                {displayName}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  </header>
);

const headingStyles = {
  gridColumn: 2,
  marginTop: "2rem",
  fontFamily: "system-ui, sans-serif", // "InterDisplay var",
  letterSpacing: "-1px",
  fontWeight: 700,
  color: "#eef1f7"
};

const ProgressBar = props => {
  const getIndicatorPercentageWidth = (currentPos, totalScroll) => {
    return (currentPos / totalScroll) * 100;
  };

  // find the total height of window
  const getScrollHeight = () => {
    // https://javascript.info/size-and-scroll-window#width-height-of-the-document
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  };

  const [scrollPositionPecentage, setScrollPositionPercentage] = useState(0);
  useEffect(() => {
    // add throttled listener to update on scroll
    let scrolling = false;
    window.addEventListener(`scroll`, () => {
      const currentPos = window.scrollY;
      const { innerHeight } = window;
      const scrollHeight = getScrollHeight();
      const scrollDistance = scrollHeight - innerHeight;

      if (!scrolling) {
        window.requestAnimationFrame(() => {
          const indicatorWidth = getIndicatorPercentageWidth(
            currentPos,
            scrollDistance
          );

          setScrollPositionPercentage(indicatorWidth);

          scrolling = false;
        });
        scrolling = true;
      }
    });

    const { innerHeight } = window;
    const scrollHeight = getScrollHeight();
    const scrollDistance = scrollHeight - innerHeight;
    const indicatorWidth = getIndicatorPercentageWidth(
      window.scrollY,
      scrollDistance
    );

    setScrollPositionPercentage(indicatorWidth);
  }, []);

  return (
    <progress
      css={{
        zIndex: 1,
        position: "fixed",
        top: 0,
        width: "100%",
        left: 0,
        height: 5,
        appearance: "none",
        background: "#11151da6",
        // "linear-gradient(124deg,#ff24004a,#e81d1d4a,#e8b71d4a,#e3e81d4a,#1de8404a,#1ddde84a,#2b1de84a,#dd00f34a,#dd00f34a)",
        opacity: 1,
        "&::-webkit-progress-value": {
          background:
            "linear-gradient(124deg,#ff2400,#e81d1d,#e8b71d,#e3e81d,#1de840,#1ddde8,#2b1de8,#dd00f3,#dd00f3)",
          backgroundSize: "100vw",
          opacity: 0.4
        },
        "&::-webkit-progress-bar": {
          // background: "#11151d",
          background: "transparent",
          opacity: 1
        },
        "&::-moz-progress-bar": {
          background:
            "linear-gradient(124deg,#ff2400,#e81d1d,#e8b71d,#e3e81d,#1de840,#1ddde8,#2b1de8,#dd00f3,#dd00f3)",
          backgroundSize: "100vw",
          opacity: 0.4
        }
      }}
      value={scrollPositionPecentage}
      max="100"
    >
      70 %
    </progress>
  );
};

const CopyButton = props => {
  const [buttonText, setText] = useState("Copy");
  return (
    <button
      css={{
        color: textColor,
        backgroundColor: "#11151da6",
        transition: "background-color 1s cubic-bezier(.27,1.35,.83,.67)",
        float: "right",
        padding: "1rem",
        "&:hover": {
          backgroundColor: "rgba(51,183,255,.21)"
        }
      }}
      onClick={e => {
        navigator.clipboard.writeText(props.content);
        setText("Done");
        setTimeout(() => {
          setText("Copy");
        }, 1000);
      }}
    >
      {buttonText}
    </button>
  );
};

export default ({ children, ...props }) => {
  let title = "Chris Biscardi's Digital Garden";
  let description = "JAMStack, Serverless, MDX, and more";
  if (props.title) {
    title = props.title;
    description = "";
  }
  return (
    <div>
      <ProgressBar />
      <Global
        styles={{
          "*": {
            boxSizing: "border-box",
            margin: 0,
            padding: 0,
            border: "0 solid #ffffff22"
          },
          html: {
            background: "#19202c",
            fontFamily: "'Inter var', system-ui, sans-serif"
          },
          body: {
            minHeight: "100vh"
          }
        }}
      />
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Chris Biscardi's Digital Garden</title>
        <meta name="twitter:title" content={title} />
        <meta name="og:title" content={title} />
        <meta name="description" content={description} />
        <meta name="twitter:description" content={description} />
        <meta name="og:type" content="website" />
        <meta name="twitter:site" content="@chrisbiscardi" />
        <meta name="twitter:creator" content="@chrisbiscardi" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="twitter:image"
          content={
            props.title
              ? encodeURI(
                  `https://opengraph.sector.tools/chris?title=${props.title}${
                    props.tags ? "&tags=" + props.tags.join(",") : ""
                  }${
                    props.contentType && props.contentType === "note"
                      ? "&budding=true"
                      : ""
                  }`
                )
              : encodeURI(
                  `https://opengraph.sector.tools/chris?title=Chris' Digital Garden`
                )
          }
        />
        {/* <link rel="stylesheet" type="text/css" href="inter/inter.css" /> */}
        {/* <style>{`@font-face {
  font-family: "Inter var experimental";
  font-weight: 100 900;
  font-display: swap;
  font-style: oblique 0deg 10deg;
  src: url("/inter/Inter.var.woff2?v=3.11") format("woff2");
}

@font-face {
  font-family: "InterDisplay var";
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
  font-named-instance: "Regular";
  src: url("/inter/InterDisplay.var.woff2?v=3.11") format("woff2");
}
`}</style> */}
      </Helmet>
      <Header />
      {props.title && (
        <div css={{ width: "57ch", margin: "2rem auto" }}>
          <h1 css={{ color: "rgba(255, 255, 255, 0.95)", fontSize: 48 }}>
            {props.title}
          </h1>
          <hr
            css={{
              height: 3,
              width: 60,
              marginTop: "2rem",
              border: "none",
              background: `linear-gradient(90deg, rgba(251,89,74,1) 0%,
            rgba(251,89,74,1)   25%, rgba(251,222,75,1)  25%,
            rgba(251,222,75,1)  50%, rgba(112,228,112,1) 50%,
            rgba(112,228,112,1) 75%, rgba(51,183,255,1)  75%)`
            }}
          />
        </div>
      )}
      <MDXProvider
        components={{
          wrapper: props => (
            <div
              css={{
                display: "grid",
                color: "rgba(255, 255, 255, 0.86)",
                gridTemplateColumns:
                  "minmax(1.2rem, 1fr) minmax(auto, 57ch) minmax(1.2rem, 1fr)"
              }}
            >
              {props.children}
            </div>
          ),
          Aside: props => (
            <div
              {...props}
              css={{
                gridColumn: 2,
                backgroundColor: "hsla(220, 26%, 18%, 1)",
                borderLeft: "2px solid rgba(51,183,255,.41)",
                padding: "1rem",
                paddingTop: 0,
                marginTop: "1rem",
                borderRight: "1px solid rgba(51,183,255,.41)"
              }}
            />
          ),
          hr: props => (
            <hr
              css={{
                height: "3px",
                marginTop: "2rem",
                border: "none",
                gridColumn: 2,
                background:
                  "linear-gradient(90deg,rgba(251,89,74,1) 0%, rgba(251,89,74,1) 25%,rgba(251,222,75,1) 25%, rgba(251,222,75,1) 50%,rgba(112,228,112,1) 50%, rgba(112,228,112,1) 75%,rgba(51,183,255,1) 75%);"
              }}
            />
          ),
          p: props => (
            <p
              css={{ gridColumn: 2, paddingTop: "1rem", lineHeight: 1.75 }}
              {...props}
            />
          ),
          img: props => (
            <img css={{ gridColumn: 2, width: "100%" }} {...props} />
          ),
          a: props => (
            <a
              css={{
                backgroundImage: `linear-gradient(90deg, rgba(251,89,74,1) 0%, rgba(251,222,75,1) 25%, rgba(112,228,112,1) 50%, rgba(51,183,255,1) 75%)`,
                "-webkit-background-clip": `text`,
                "-webkit-text-fill-color": `rgba(255,255,255,0.46)`,
                display: "inline-block",
                "&:hover": {
                  "-webkit-text-fill-color": `rgba(255,255,255,.1)`
                }
              }}
              {...props}
            />
          ),
          h1: props => <h1 css={headingStyles} {...props} />,
          h2: props => <h2 css={headingStyles} {...props} />,
          h3: props => <h3 css={headingStyles} {...props} />,
          h4: props => <h4 css={headingStyles} {...props} />,
          h5: props => <h5 css={headingStyles} {...props} />,
          h6: props => <h6 css={headingStyles} {...props} />,
          ul: props => <ul css={{ gridColumn: 2 }} {...props} />,
          ol: props => <ol css={{ gridColumn: 2 }} {...props} />,
          table: props => (
            <table css={{ gridColumn: 2, marginTop: "1rem" }} {...props} />
          ),
          thead: props => (
            <thead css={{ background: "#ffffff12" }} {...props} />
          ),
          th: props => (
            <th css={{ padding: ".5rem", textAlign: "left" }} {...props} />
          ),
          td: props => (
            <td
              css={{ padding: ".5rem", borderBottom: "1px solid #ffffff22" }}
              {...props}
            />
          ),
          pre: props => {
            const lang =
              props.children.props.class &&
              props.children.props.class.split("-")[1];
            const langMap = {
              graphql: "GraphQL",
              js: "JS"
            };

            return (
              <div
                css={{
                  gridColumn: 2,
                  background: "#11151d",
                  overflow: "auto",
                  borderRadius: 10,
                  marginTop: "1rem",
                  position: "relative",
                  border: "1px solid rgba(51,183,255,.21)",
                  boxShadow: `inset 0 2.8px 2.2px rgba(0,0,0,0.02),
                      inset 0 6.7px 5.3px rgba(0,0,0,0.028),
                      inset 0 12.5px 10px rgba(0,0,0,0.035),
                      inset 0 22.3px 17.9px rgba(0,0,0,0.042),
                      inset 0 41.8px 33.4px rgba(0,0,0,0.05),
                      inset 0 100px 80px rgba(0,0,0,0.07)`
                }}
              >
                <div
                  css={{
                    fontSize: `12px`,
                    display: `flex`,
                    justifyContent: `space-between`,
                    position: `sticky`,
                    left: 0,
                    borderBottom: "1px solid rgba(51,183,255,.21)"
                  }}
                >
                  <span css={{ padding: "1rem" }}>
                    {props.children.props.title}
                  </span>
                  <div css={{ display: "flex" }}>
                    <span css={{ padding: "1rem" }}>
                      {langMap[lang] || lang || ""}
                    </span>
                    <CopyButton content={props.children.props.codestring} />
                  </div>
                </div>
                <div
                  css={{ padding: "1rem 2rem" }}
                  dangerouslySetInnerHTML={{
                    __html: props.children.props.children
                  }}
                />
              </div>
            );
          },
          blockquote: props => (
            <blockquote
              css={{
                gridColumn: 2,
                backgroundColor: "#1d2634",
                backgroundImage: `linear-gradient(180deg,rgba(251,89,74,.5) 0%,rgba(251,89,74,.5) 25%,rgba(251,222,75,.5) 25%,rgba(251,222,75,.5) 50%,rgba(112,228,112,.5) 50%,rgba(112,228,112,.5) 75%,rgba(51,183,255,.5) 75%)`,
                backgroundSize: "3px 100%",
                backgroundRepeat: "no-repeat",
                paddingLeft: "1rem",
                marginTop: "1rem",
                borderRight: `1px solid hsla(217, 28%, 26%, 1)`,
                paddingTop: `1rem`,
                paddingBottom: `1rem`,
                "&:hover": {
                  backgroundImage: `linear-gradient(180deg,rgba(251,89,74,1) 0%, rgba(251,89,74,1) 25%,rgba(251,222,75,1) 25%, rgba(251,222,75,1) 50%,rgba(112,228,112,1) 50%, rgba(112,228,112,1) 75%,rgba(51,183,255,1) 75%)`
                }
              }}
              {...props}
            />
          ),
          "blockquote.p": props => (
            <p css={{ gridColumn: 2, lineHeight: 1.75 }} {...props} />
          )
        }}
      >
        <Fragment>{children}</Fragment>
      </MDXProvider>
      <div css={{ height: "5rem" }} />
    </div>
  );
};
