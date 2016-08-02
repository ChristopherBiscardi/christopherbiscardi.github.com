const fs = require('fs');
const postcss = require('postcss');
const { createDebugger, matcher } = require('postcss-debug');
 
const debug = createDebugger();
/* or limit gathering debug data to certain css files only:
   const debug = createDebugger([
   matcher.contains('style/some-file.css'),
   matcher.regex(/foo\.css/)
   ])
 */

const plugins = [
  require('postcss-import'),
  require('postcss-brand-colors'),
  require('postcss-modular-scale')({
    bases: 1,
    ratios: 1.5
  }),
  require('postcss-responsive-type'),
  require('postcss-cssnext')({
    browsers: 'last 2 versions'
  }),
  require('lost')({
    flexbox: 'flex'
  }),
  require('postcss-font-magician')({
    hosted: './static/fonts'
  }),
  // require('list-selectors').plugin(function(selectorList) {
  //   console.log(selectorList)
  // }),
  //      require('immutable-css'),
  require('postcss-browser-reporter')
]

const css = fs.readFileSync('./css/highlight.css', 'utf-8')
postcss(debug(plugins))
             .process(css, {
               from: 'css/mono-blue.css',
               to: 'debug.css'
             })
             .then(result => {
               debug.inspect()
             })
