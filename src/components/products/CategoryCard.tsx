import { useRecoilValue } from "recoil";
import ProductCard from "./ProductCard";
import productState from "../../atoms/productAtom";

const CategoryCard = ({ category, ...props }: { category: string }) => {
  const products = useRecoilValue(productState);
  return (
    <div className="bg-gray-100 rounded-lg w-80 p-4 h-[85vh]" {...props}>
      <h2 className="text-gray-600 font-medium mb-4">{category}</h2>

      <div className="space-y-4">
        {products
          .filter((product) => product.category === category)
          .map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryCard;
