import { Link } from "react-router";
import Layout from "../Layout/Layout";

const Home = () => {
  return (
    <Layout>
      Head to{" "}
      <Link to="/products" className="text-blue-500 hover:underline">
        Products
      </Link>{" "}
      page
    </Layout>
  );
};

export default Home;
