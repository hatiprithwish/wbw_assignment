import { useRecoilState } from "recoil";
import formStateAtom from "../../atoms/formStateAtom";
import { useForm } from "react-hook-form";
import { forwardRef, useImperativeHandle } from "react";
import { LucideBadgeIndianRupee, PercentCircle } from "lucide-react";
import { cn } from "../../lib/tailwind";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const priceInfoSchema = z.object({
  priceINR: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1"),
  discount: z.object({
    value: z.coerce
      .number({
        invalid_type_error: "Discount must be a number",
      })
      .min(0, "Discount cannot be negative")
      .optional(),
    method: z.enum(["pct", "flat"]).optional(),
  }),
});

type PriceInfoFormData = z.infer<typeof priceInfoSchema>;

const PriceInfoForm = forwardRef((_, ref) => {
  const [formState, setFormState] = useRecoilState(formStateAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PriceInfoFormData>({
    resolver: zodResolver(priceInfoSchema),
    defaultValues: {
      priceINR: formState.priceINR,
      discount: {
        value: formState.discount.value,
        method: formState.discount.method || undefined,
      },
    },
  });

  const onSubmit = (data: PriceInfoFormData) => {
    console.log(data);
    setFormState((prev) => ({
      ...prev,
      priceINR: data.priceINR,
      discount: {
        method: data.discount.method || prev.discount.method,
        value: data.discount.value ?? prev.discount.value,
      },
    }));
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSubmit(onSubmit)(); // Immediately invoke the handler
      return Object.keys(errors).length === 0;
    },
    formState: { errors },
  }));

  return (
    <div className="w-[500px] mt-8 shadow-[0px_0px_20px_-2px_#0000001A] p-4 rounded-xl">
      <h2 className="font-semibold">Price Info</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
          <label className="text-sm block mb-4">
            Price (INR) <sup>*</sup>
            <input
              {...register("priceINR")}
              type="number"
              className={`border-[1px] border-gray-200 w-full px-4 py-2 text-black text-base rounded-md mt-2 ${
                errors.priceINR ? "border-red-500" : ""
              }`}
            />
            {errors.priceINR && (
              <p className="text-red-500 text-xs mt-1">
                {errors.priceINR.message}
              </p>
            )}
          </label>

          <div className="flex items-center gap-4">
            <label className="text-sm block mb-4 w-full">
              Discount <sup>*</sup>
              <input
                {...register("discount.value")}
                type="number"
                className={`border-[1px] border-gray-200 w-full px-4 py-2 text-black text-base rounded-md mt-2 ${
                  errors.discount?.value ? "border-red-500" : ""
                }`}
              />
              {errors.discount?.value && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.discount.value.message}
                </p>
              )}
            </label>

            <div className="flex items-stretch justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    discount: {
                      ...prev.discount,
                      method: prev.discount.method === "pct" ? "flat" : "pct",
                    },
                  }))
                }
                className="flex items-center gap-2 border-[1px] border-gray-200 rounded-md mt-2 w-20 h-10"
              >
                <PercentCircle
                  // onClick={() => updateDiscountMethod("flat")}
                  className={cn(
                    formState.discount.method === "pct"
                      ? "bg-gray-200"
                      : "text-black",
                    "w-10 h-full p-1.5"
                  )}
                />
                <LucideBadgeIndianRupee
                  // onClick={() => updateDiscountMethod("flat")}
                  className={cn(
                    formState.discount.method === "flat"
                      ? "bg-gray-200"
                      : "text-black",
                    "w-10 h-full p-1.5"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});

export default PriceInfoForm;
