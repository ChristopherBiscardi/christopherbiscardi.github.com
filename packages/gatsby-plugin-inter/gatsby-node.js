const fs = require("fs");
const path = require("path");
exports.onPreBootstrap = () => {
  const sourceDir = path.join(path.dirname(require.resolve(".")), "./inter");
  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    //	console.log(file)
    fs.copyFileSync(
      path.join(sourceDir, file),
      path.join(process.cwd(), "public", file)
    );
  });
  // fs.copyFileSync('source.txt', 'destination.txt', COPYFILE_EXCL);
};
