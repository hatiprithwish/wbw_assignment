import { Product } from "../../atoms/productAtom";

const ProductCard = ({ product, ...props }: { product: Product }) => {
  return (
    <div
      className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-md hover:shadow-xl transition-shadow"
      {...props}
    >
      <img src="/demo.png" width={84} height={84} alt="product image" />
      <div>
        <h3 className="font-medium mb-1">{product.name}</h3>
        <p className="text-sm mb-2">₹{product.priceINR}</p>
        <p className="bg-sky-50 text-sky-500 rounded p-1 text-xs font-medium w-fit">
          {product.brand}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
