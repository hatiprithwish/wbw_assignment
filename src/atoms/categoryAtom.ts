import { atom } from "recoil";

interface Category {
  id: string;
  name: string;
}

const categoryState = atom<Category[]>({
  key: "categoryState",
  default: [
    {
      id: "c9f685c9-a226-4d49-8c0d-9cfd138b5ad2",
      name: "Shoes",
    },
  ],
});

export default categoryState;
