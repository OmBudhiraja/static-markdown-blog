import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function handler(req, res) {
  let posts;
  if (process.env.NODE_ENV === "production") {
    posts = require("./../../cache/data").posts;
  } else {
    const files = fs.readdirSync(path.join("posts"));
    posts = files.map((fileName) => {
      const slug = fileName.replace(".md", "");
      const markdownWithMeta = fs.readFileSync(
        path.join("posts", fileName),
        "utf-8"
      );
      const { data: frontmatter } = matter(markdownWithMeta);
      return { frontmatter, slug };
    });
  }

  const results = posts.filter(
    ({ frontmatter: { title, excerpt, category } }) => {
      return (
        title.toLowerCase().indexOf(req.query.q.toLowerCase()) != -1 ||
        excerpt.toLowerCase().indexOf(req.query.q.toLowerCase()) != -1 ||
        category.toLowerCase().indexOf(req.query.q.toLowerCase()) != -1
      );
    }
  );

  res.status(200).json({ results });
}
