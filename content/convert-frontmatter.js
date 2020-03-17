const fs = require("fs").promises;
const fm = require("front-matter");

const dir = "./posts";
async function run() {
  const files = await fs.readdir(dir, "utf-8");
  await Promise.all(
    files
      .filter(name => name.endsWith("mdx"))
      .map(async filename => {
        const file = await fs.readFile(`${dir}/${filename}`, "utf-8");
        const { attributes, body } = fm(file);
        const content = `export const meta = ${JSON.stringify(
          attributes,
          null,
          2
        )}

${body}`;
        await fs.writeFile(`${dir}/${filename}`, content, "utf-8");
        // console.log(content);
        return content;
      })
  );
}

run();
