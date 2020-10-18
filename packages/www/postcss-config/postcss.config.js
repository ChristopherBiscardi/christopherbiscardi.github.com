module.exports = {
  plugins: [
    require("tailwindcss")("./postcss-config/tailwind.config.js"),
    require("autoprefixer")
  ]
};
