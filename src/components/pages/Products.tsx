import { useState } from "react";
import Layout from "../Layout/Layout";
import CategoryCard from "../products/CategoryCard";
import CategoryForm from "../forms/CategoryForm";
import Modal from "../../ui/Modal";
import { useRecoilState } from "recoil";
import categoryState from "../../atoms/categoryAtom";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [categories, _] = useRecoilState(categoryState);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const handleAddCategory = () => {
    setIsCategoryModalOpen(true);
  };

  return (
    <>
      <Layout>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold mb-6">Products</h1>
          <div>
            <button
              className="bg-gray-200 text-sky-600 px-4 py-2 rounded-md font-medium mr-4"
              onClick={handleAddCategory}
            >
              Add Category
            </button>
            <button
              className="bg-sky-600 text-white px-4 py-2 rounded-md font-medium"
              onClick={() => navigate("/products/add")}
            >
              Add Product
            </button>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category.name} />
          ))}
        </div>

        {/* ----- Modals ----- */}
        <Modal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
        >
          <CategoryForm setIsCategoryModalOpen={setIsCategoryModalOpen} />
        </Modal>
      </Layout>
    </>
  );
};

export default Products;
