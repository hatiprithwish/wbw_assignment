import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Catalogue from "./components/pages/Catalogue";
import Docs from "./components/pages/Docs";
import Promotions from "./components/pages/Promotions";
import Reports from "./components/pages/Reports";
import Settings from "./components/pages/Settings";
import Stores from "./components/pages/Stores";
import Products from "./components/pages/Products";
import { Toaster } from "react-hot-toast";
import ProductLayout from "./components/Layout/ProductLayout";
import AddProduct from "./components/pages/AddProduct";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<ProductLayout />}>
          <Route index element={<Products />} />
          <Route path="add" element={<AddProduct />} />
        </Route>
        <Route path="catalogue" element={<Catalogue />} />
        <Route path="docs" element={<Docs />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="stores" element={<Stores />} />
      </Routes>
    </>
  );
}

export default App;
