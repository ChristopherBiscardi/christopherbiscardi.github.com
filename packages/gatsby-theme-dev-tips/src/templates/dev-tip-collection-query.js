import { graphql } from "gatsby";
import React from "react";

import DevTipCollection from "../components/dev-tip-collection";

export default props => <DevTipCollection {...props} />;

export const query = graphql`
  query DevTipCollectionQuery($slug: String!) {
    devTipsCollection: devTipsYaml(slug: { eq: $slug }) {
      id
      name
      description
    }
    allDevTip(filter: { collection: { slug: { eq: $slug } } }) {
      nodes {
        id
        title
        tweet
        body
      }
    }
  }
`;
