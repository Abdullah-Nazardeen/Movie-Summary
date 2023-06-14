import Footer from "./Footer";
import Meta from "./Meta";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Navbar />
      <main className="bg-gray-900 text-white min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
