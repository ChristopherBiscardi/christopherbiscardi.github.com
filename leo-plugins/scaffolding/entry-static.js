import React from "react";
import ReactDOM, { renderToStaticMarkup } from "react-dom/server";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { StaticRouter as Router } from "react-router";
import path from "path";
import "isomorphic-fetch";
import { execute } from "graphql";
import { print } from "graphql";
const debug = require("debug")("leo-scaffolding-apollo:entry-static");
import md5 from "md5";
import Helmet from "react-helmet";
import { renderStatic } from "glamor/server";

import routes from "@sa-labs/leo-core/build/load-routes";
import Html from "@sa-labs/leo-core/build/load-html";
import { conf, schema } from "@sa-labs/leo-core/build/inserted-files";

const gqlInterface = {
  query(
    {
      query,
      variables,
      operationName
    }
  ) {
    // TODO: static render is failing for some reason?!?!?
    const variablesString = Object.entries(variables)
      .reduce((acc, [key, val]) => `${acc}:${key}:${val}`, "");
    const queryHash = md5(print(query));
    return execute(
      schema,
      query,
      undefined,
      undefined,
      variables,
      operationName
    ).then(json => {
      _globalJSONAsset({
        name: `/api/${queryHash}--${md5(variablesString)}.json`,
        json: json
      });
      return json;
    });
  }
};

export default (locals, callback) => {
  debug(`${locals.path} rendering`);
  const client = new ApolloClient({
    ssrMode: true,
    networkInterface: gqlInterface
  });

  let ctx = {};
  const component = (
    <ApolloProvider client={client}>
      <Router location={locals.path} context={ctx}>
        {routes}
      </Router>
    </ApolloProvider>
  );

  getDataFromTree(component)
    .then(context => {
      const {
        html: body,
        css,
        ids
      } = renderStatic(() => ReactDOM.renderToString(component));
      const initialState = { [client.reduxRootKey]: client.getInitialState() };
      /**
       * https://github.com/nfl/react-helmet/tree/16b3d67492f047aea635cddfaeadcf2686a00883#server-usage
       * See above URL for reasoning behind `rewind()`
       */
      const head = Helmet.rewind();
      const html = renderToStaticMarkup(
        <Html
          body={body}
          glamor={{ css, ids }}
          helmet={head}
          assets={locals.assets}
          bundleAssets={locals.assetsPluginHash}
          data={initialState}
        />
      );
      callback(null, html);
    })
    .catch(e => {
      debug(`${locals.path} failed`);
      callback(e);
    });
};
