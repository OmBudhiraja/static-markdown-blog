/* eslint-disable @next/next/no-img-element */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "@/components/Layout";
import Link from "next/link";
import CategoryLabel from "@/components/CategoryLabel";
import { marked } from "marked";

const PostPage = ({ frontmatter, content, slug }) => {
  const { title, category, date, cover_image, author, author_image } =
    frontmatter;
  return (
    <Layout title={`${title} | Devspace`}>
      <Link href="/blog">Go Back</Link>
      <div className="w-full px-10 py-6 rounded-lg shadow-md bg-white mt-6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <img src={cover_image} alt={title} className="w-full rounded" />
        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <img
              src={author_image}
              alt={author}
              className="rounded-full object-cover h-10 w-10 mx-4 hidden sm:block"
            />
            <h4>{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>
        <div className="mt-2 blog-text">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </Layout>
  );
};

export function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}

export default PostPage;
