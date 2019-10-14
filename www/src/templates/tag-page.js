import React, { Fragment, useContext } from "react";
import { Link, graphql } from "gatsby";
import { Styled, css } from "theme-ui";
import Helmet from "react-helmet";
import slugify from "@sindresorhus/slugify";

import Layout from "gatsby-theme-blog/src/components/layout";
import SEO from "gatsby-theme-blog/src/components/seo";
import Footer from "gatsby-theme-blog/src/components/home-footer";

import { TagPageDataContext } from "../components/tag-page-data-context";

const Posts = ({ data, pageContext, location }) => {
  const { siteTitle, socialLinks, tag } = pageContext;

  const posts = data.allBlogPost.edges;
  return (
    <TagPageDataContext.Provider value={{ tag }}>
      <Layout location={location} title={siteTitle}>
        <main>
          {posts.map(({ node }) => {
            const title = node.title || node.slug;
            const keywords = node.keywords || [];
            return (
              <Fragment key={node.slug}>
                <SEO title={`Tag: ${tag}`} keywords={keywords} />
                <div>
                  <Styled.h2
                    sx={{
                      mb: 1
                    }}
                  >
                    <Styled.a
                      as={Link}
                      sx={{
                        textDecoration: `none`
                      }}
                      to={node.slug}
                    >
                      {title}
                    </Styled.a>
                  </Styled.h2>
                  <Styled.p>{node.excerpt}</Styled.p>
                </div>
              </Fragment>
            );
          })}
        </main>
        <Footer socialLinks={socialLinks} />
      </Layout>
      <Helmet
        meta={[
          {
            name: `twitter:card`,
            content: "summary_large_image"
          },
          {
            name: `twitter:image`,
            content: `https://www.christopherbiscardi.com/opengraph-images/tags/${tag}.png`
          },
          { name: `twitter:site`, content: `@chrisbiscardi` }
        ]}
      />
    </TagPageDataContext.Provider>
  );
};

export default Posts;

export const query = graphql`
  query TagPageQuery($tag: String!) {
    allBlogPost(
      sort: { fields: [date, title], order: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      edges {
        node {
          id
          excerpt
          slug
          title
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;
