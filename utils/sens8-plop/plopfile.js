const path = require("path");

module.exports = function(plop) {
  plop.setGenerator("component", {
    description: "A design system component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name please"
      }
    ],
    actions: [
      {
        type: "addMany",
        destination: "packages/{{dashCase name}}",
        templateFiles: "templates/component/*",
        base: "templates/component"
      },
      {
        type: "append",
        path: "packages/sens8/index.js",
        template:
          "export { default as {{pascalCase name}} } from '@sens8/component-{{dashCase name}}'",
        pattern: /$/
      }
    ]
  });
};
