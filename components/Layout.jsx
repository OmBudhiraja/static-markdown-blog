import Head from "next/head";
import Header from "./Header";
import Search from "./Search";

const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
      </Head>
      <Header />
      <Search />
      <main className="container mx-auto my-8">{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  title: "Devspace Blog",
  description: "The best blogs related to coding and developement",
  keywords: "developement, coding, programming, blogs",
};

export default Layout;
