import { atom } from "recoil";
import { FormState } from "./formStateAtom";

export type Product = FormState;

const productState = atom<Product[]>({
  key: "productState",
  default: [
    {
      name: "Nike Air Jordan",
      category: "Shoes",
      brand: "Nike",
      image: "/demo.png",
      variants: [{ name: "Color", values: ["Red", "Blue", "Green"] }],
      combinations: {
        a: {
          name: "Red",
          sku: "Nike-Air-Jordan-Red",
          quantity: 10,
          inStock: true,
        },
      },
      priceINR: 25000,
      discount: {
        method: "pct",
        value: 10,
      },
    },
  ],
});

export default productState;
