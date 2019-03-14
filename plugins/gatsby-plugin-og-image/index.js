const Jimp = require("jimp");
const path = require("path");
const slugify = require("@sindresorhus/slugify");
const revHash = require("rev-hash");

// writes an og image file out, returns file path
exports.writeOGFile = async function({ text }) {
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);

  const img = new Jimp(800, 400, "#fff");

  await img.print(font, 10, 10, text);
  const imgBuf = await img.getBufferAsync(Jimp.MIME_PNG);
  const url = path.join(
    `static`,
    `og-image`,
    `${slugify(text)}-${revHash(imgBuf)}.png`
  );

  const publicPath = path.join(process.cwd(), `public`, url);
  await img.writeAsync(publicPath);
  return path.join("/", url);
};
