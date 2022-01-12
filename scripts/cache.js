const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postData = () => {
  const files = fs.readdirSync(path.join("posts"));
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", fileName),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return { frontmatter, slug };
  });

  return `export const posts = ${JSON.stringify(posts)}`;
};

try {
  fs.readdirSync("cache");
} catch (error) {
  fs.mkdirSync("cache");
}

fs.writeFile("cache/data.js", postData(), function (err) {
  if (err) console.log(err);
});
