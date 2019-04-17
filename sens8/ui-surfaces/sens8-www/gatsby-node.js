// remove styled-components from docz because it doesn't play well with others
exports.onCreateBabelConfig = ({ store }) => {
  const babelStages = store.getState().babelrc.stages;
  store.getState().babelrc.stages = Object.entries(babelStages)
    .map(([stage, { plugins, presets, options }]) => {
      return [
        stage,
        {
          plugins: plugins.filter(
            plugin => plugin.name !== "babel-plugin-styled-components"
          ),
          presets,
          options
        }
      ];
    })
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /(sens8\/packages|@sens8)/,
          use: [loaders.js()]
        }
      ]
    },
    plugins: [
      plugins.define({
        __DEVELOPMENT__: stage === `develop` || stage === `develop-html`
      })
    ]
  });
};
