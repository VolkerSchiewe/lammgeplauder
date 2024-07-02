import Layout from "../../components/Layout";
import Navbar from "./Navbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <Layout className={`min-h-screen flex flex-col items-center`}>
      <Navbar />
      <div className={` w-full md:w-1/2`}>{children}</div>
    </Layout>
  );
}
