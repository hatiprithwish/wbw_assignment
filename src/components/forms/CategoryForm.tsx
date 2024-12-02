import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { z } from "zod";
import categoryState from "../../atoms/categoryAtom";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { v4 as uuid4 } from "uuid";

interface FormData {
  category: string;
}

const CategoryForm = ({
  setIsCategoryModalOpen,
}: {
  setIsCategoryModalOpen: any;
}) => {
  const [categories, setCategories] = useRecoilState(categoryState);

  const categorySchema = z.object({
    category: z
      .string()
      .min(3, "Category name must be at least 3 characters long")
      .trim(),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = (data: z.infer<typeof categorySchema>) => {
    const id = uuid4();
    setCategories([
      ...categories,
      {
        id,
        name: data.category,
      },
    ]);
    setIsCategoryModalOpen(false);
    toast.success("Category added");
  };

  return (
    <div className="w-[560px]">
      <h4 className="text-2xl font-semibold mb-6">Add category</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="text-sm block mb-4">
          Category Name <sup>*</sup>
          <br />
          <input
            {...register("category")}
            placeholder="T-shirt"
            className="border-[1px] border-gray-200 w-full px-4 py-2 text-black text-base rounded-md mt-2"
          />
          {errors.category && (
            <p className="text-red-500 mt-1 text-xs">
              {errors.category.message}
            </p>
          )}
        </label>

        <div className="flex gap-2 justify-end w-full">
          <button
            type="button"
            className="bg-gray-200 text-sky-600 px-4 py-2 rounded-md font-medium mr-4"
            onClick={() => setIsCategoryModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-sky-600 text-white px-4 py-2 rounded-md font-medium"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
