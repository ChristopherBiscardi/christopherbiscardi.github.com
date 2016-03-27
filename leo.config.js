var hljs = require('highlight.js');
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: highlight,
})

function highlight (str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return '<pre class="hljs"><code>' +
             hljs.highlight(lang, str, true).value +
             '</code></pre>';
    } catch (__) {}
  }

  return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
}

module.exports = {
  "plugins": [
    "@sa-labs/leo-plugin-blogpost",
    "@sa-labs/leo-plugin-markdown",
    "@sa-labs/leo-plugin-fate",
    "@sa-labs/leo-plugin-images"
  ],
  "urls": [
    "/"
  ],
  "@sa-labs/leo-plugin-markdown": {
    instance: md.use(require('markdown-it-emoji'))
                .use(require('markdown-it-named-headers'))
                .use(require('markdown-it-video'))
                .use(require('markdown-it-footnote'))
  }
}
