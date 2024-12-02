import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { z } from "zod";
import categoryState from "../../atoms/categoryAtom";
import formStateAtom from "../../atoms/formStateAtom";
import { forwardRef, useImperativeHandle } from "react";

interface FormData {
  name: string;
  category: string;
  brand: string;
}

const DescriptionForm = forwardRef((_, ref) => {
  const categories = useRecoilValue(categoryState);
  const [formState, setFormState] = useRecoilState(formStateAtom);
  const descriptionSchema = z.object({
    name: z.string().min(3, "Product name must be at least 3 characters long"),
    category: z.enum(
      categories.map((category) => category.name) as [string, ...string[]]
    ),
    brand: z.string().min(3, "Brand name must be at least 3 characters long"),
  });

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: formState,
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setFormState((prev) => ({ ...prev, ...data }));
  };

  // Expose the submit function to the parent component
  useImperativeHandle(ref, () => ({
    submit: handleSubmit(onSubmit),
    formState: { errors },
  }));

  return (
    <div className="w-[500px] mt-8 shadow-[0px_0px_20px_-2px_#0000001A] p-4 rounded-xl">
      <h2 className="font-semibold">Description</h2>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="text-sm block mb-4">
          Product Name <sup>*</sup>
          <input
            {...register("name")}
            value={watch("name")}
            className="border-[1px] border-gray-200 w-full px-4 py-2 text-black text-base rounded-md mt-2"
            placeholder="Nike Air Jordan"
          />
        </label>
        {errors.name && (
          <p className="text-red-500 mt-1 text-xs">{errors.name.message}</p>
        )}

        <label className="text-sm block mb-4">
          Category <sup>*</sup>
          <select
            {...register("category")}
            value={watch("category")}
            className="border-[1px] cursor-pointer border-gray-200 w-full px-4 py-2 text-black text-base rounded-md mt-2"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm block mb-4">
          Brand <sup>*</sup>
          <input
            {...register("brand")}
            value={watch("brand")}
            className="border-[1px] border-gray-200 w-full px-4 py-2 text-black text-base rounded-md mt-2"
            placeholder="Nike"
          />
        </label>
        {errors.brand && (
          <p className="text-red-500 mt-1 text-xs">{errors.brand.message}</p>
        )}
      </form>
    </div>
  );
});

export default DescriptionForm;
