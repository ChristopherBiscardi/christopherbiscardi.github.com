import { graphql } from "gatsby";
import React from "react";
import DevTipCollections from "../components/dev-tip-collections";

export default props => <DevTipCollections {...props} />;

export const query = graphql`
  query DevTipCollectionsQuery {
    allDevTipCollections: allDevTipsYaml {
      nodes {
        id
        name
        slug
        description
      }
    }
  }
`;
