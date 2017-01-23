module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-brand-colors'),
    require('postcss-constants')({
      defaults: {}
    }),
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
}
