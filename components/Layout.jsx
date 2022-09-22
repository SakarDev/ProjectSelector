import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <div className="px-20 pb-8 bg-[#111827] !mt-0 min-h-screen">
      <Nav />

      {children}
    </div>
  );
};

export default Layout;
