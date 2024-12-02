import { Sidebar } from "./Sidebar";

const Layout = ({ children }: any) => {
  return (
    <main className="flex w-full">
      <Sidebar />
      <section className="flex-1 px-4 py-6">{children}</section>
    </main>
  );
};

export default Layout;
