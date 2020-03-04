import React from "react";
import Helmet from "react-helmet";
// import defaultOGImage from "./default-og-image.png";

function SEO({
  description,
  lang = "en",
  meta = [],
  keywords = [],
  title,
  image
}) {
  const metaDescription = description || `test description`;
  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | Chris Biscardi`}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          property: `twitter:site`,
          content: "@chrisbiscardi"
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`
        },
        {
          name: `twitter:creator`,
          content: `@chrisbiscardi`
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        }
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `)
              }
            : []
        )
        .concat(
          image
            ? {
                name: `twitter:image`,
                content: `https://www.christopherbiscardi.com${image}`
              }
            : {
                name: `twitter:image`,
                content: `https://www.christopherbiscardi.com${defaultOGImage}`
              }
        )
        .concat(meta)}
    />
  );
}

export default SEO;
