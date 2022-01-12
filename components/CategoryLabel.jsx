import Link from "next/link";

const CategoryLabel = ({ children }) => {
  const colorKey = {
    javascript: "yellow",
    css: "blue",
    python: "green",
    php: "purple",
    ruby: "red",
  };
  const bgColor = `bg-${colorKey[children.toLowerCase()]}-600`;
  return (
    <div className={`px-2 py-1 font-bold ${bgColor} text-gray-100 rounded`}>
      <Link href={`/blog/category/${children.toLowerCase()}`}>{children}</Link>
    </div>
  );
};

export default CategoryLabel;
