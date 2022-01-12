/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import CategoryLabel from "./CategoryLabel";

const Post = ({ post, compact }) => {
  return (
    <div className="w-full rounded-lg bg-white px-10 py-6 shadow-md mt-6">
      {!compact && (
        <Image
          src={post.frontmatter.cover_image}
          height={420}
          width={600}
          alt={post.frontmatter.title}
          className="rounded mb-4"
        />
      )}
      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">
          {post.frontmatter.date}
        </span>
        <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
      </div>
      <div className="mt-2">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-2xl text-gray-800 font-bold hover:underline">
            {post.frontmatter.title}
          </a>
        </Link>
        <p className="mt-2 text-gray-600">{post.frontmatter.excerpt}</p>
      </div>
      {!compact && (
        <div className="flex justify-between items-center mt-6">
          <Link href={`/blog/${post.slug}`}>
            <a className="text-gray-900 hover:text-blue-600">Read More</a>
          </Link>
          <div className="flex items-center">
            <img
              src={post.frontmatter.author_image}
              alt={post.frontmatter.author}
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />
            <h3 className="font-bold text-gray-700">
              {post.frontmatter.author}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
