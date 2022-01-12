import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { getPosts } from "@/lib/post";
import CategoryList from "@/components/CategoryList";

export default function CategoryPostPage({ posts, categoryName, categories }) {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            Posts related to {categoryName}
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const categories = files.map((fileName) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", fileName),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => {
    return {
      params: { category_name: category.toLowerCase() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category_name } }) {
  const posts = getPosts();
  // filter posts by category
  const categoryPosts = posts.filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  // get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category);

  const uniqueCategory = [...new Set(categories)];

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategory,
    },
  };
}
