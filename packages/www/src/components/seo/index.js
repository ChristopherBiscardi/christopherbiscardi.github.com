import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import defaultOGImage from "./default-og-image.png";

function SEO({
  description,
  lang = "en",
  meta = [],
  keywords = [],
  title,
  image
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description;
        return (
          <Helmet
            htmlAttributes={{
              lang
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
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
                content: data.site.siteMetadata.author
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
      }}
    />
  );
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired
};

export default SEO;

const detailsQuery = graphql`
  query MyDefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
