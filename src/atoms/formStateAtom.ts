import { atom } from "recoil";

export type FormState = {
  name: string;
  category: string;
  brand: string;
  image: string;
  variants: { name: string; values: string[] }[];
  combinations: {
    [key: string]: {
      name: string;
      sku: string;
      quantity: number | null;
      inStock: boolean;
    };
  };
  priceINR: number;
  discount: {
    method: "pct" | "flat" | undefined;
    value: number | undefined;
  };
};

const formState = atom<FormState>({
  key: "formState",
  default: {
    name: "",
    category: "",
    brand: "",
    image: "",
    variants: [],
    combinations: {},
    priceINR: 0,
    discount: {
      method: undefined,
      value: 0,
    },
  },
});

export default formState;
