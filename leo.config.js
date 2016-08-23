const hljs = require('hljs-modules');
const hook = require('css-modules-require-hook');

// CSS Modules Require Hook
// This may cause issues one day due to overloaded require
hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  append: [
      require('postcss-import'),
      require('postcss-brand-colors'),
      require('postcss-responsive-type'),
      require('postcss-cssnext')({
        browsers: 'last 2 versions'
      }),
  ]
});

const css = require('./css/highlight.css');

hljs.configure({ classNames: css });

function highlight (str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return `<pre class="${css['hljs']}"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
    } catch (__) {
      console.log('failed to highlight');
    }
  }

  return `<pre class="${css['hljs']}"><code>${md.utils.escapeHtml(str)}</code></pre>`;
}

var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: highlight,
});

module.exports = {
  "plugins": [
    "@sa-labs/leo-plugin-blogpost",
    "@sa-labs/leo-plugin-markdown",
    "@sa-labs/leo-plugin-fate",
    "@sa-labs/leo-plugin-images"
  ],
  "urls": [
    "/",
    "/about/"
  ],
  "@sa-labs/leo-plugin-markdown": {
    instance: md.use(require('markdown-it-emoji'))
                .use(require('markdown-it-named-headers'))
                .use(require('markdown-it-video'))
                .use(require('markdown-it-footnote'))
  },
  "define": {
    __DOMAIN__: JSON.stringify("http://christopherbiscardi.com")
  }
}
