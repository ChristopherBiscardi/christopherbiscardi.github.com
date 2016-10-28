module.exports = function(data, cb) {
  const blogposts = data.filter(o => o.contentType === 'leo-blogpost');

  cb(null, data);
}

// TODO: medium-loader
// Finish Preact? Add another scaffolding plugin
