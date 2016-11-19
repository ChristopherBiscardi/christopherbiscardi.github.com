module.exports = {
  "parser": "babel-eslint",
  "rules": {
    "graphql/template-strings": ['error', {
      // Import default settings for your GraphQL client. Supported values:
      // 'apollo', 'relay', 'lokka'
      env: 'apollo',

      // Import your schema JSON here
      schemaJson: require('./dist/api/schema.json'),

      // OR provide absolute path to your schema JSON
      // schemaJsonFilepath: path.resolve(__dirname, './schema.json'),

      // tagName is gql by default
    }]
  },
  plugins: [
    'graphql'
  ]
}
