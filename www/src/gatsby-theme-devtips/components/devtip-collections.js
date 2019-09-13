/** @jsx jsx */
import React from "react";
import Layout from "gatsby-theme-blog/src/components/layout";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { jsx, Styled } from "theme-ui";
import { Link } from "gatsby";

export default props => {
  return (
    <Layout location={props.location} title={`All DevTip Collections`}>
      <div>
        {props.data.allDevTipCollections.nodes.map(
          ({ name, description, slug }) => {
            return (
              <div>
                <Styled.h2>{name}</Styled.h2>
                <Styled.a as={Link} to={`/devtips/${slug}`}>
                  View Tips
                </Styled.a>
                <Styled.p>{description}</Styled.p>
              </div>
            );
          }
        )}
      </div>
    </Layout>
  );
};
